import React, {useState} from 'react';
import {View, Image, LayoutChangeEvent, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedScrollHandler,
  interpolate,
  useAnimatedRef,
  useDerivedValue,
} from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import {getAuth} from '@react-native-firebase/auth';
import tw from '@utils/tailwind';
import {MyIcon} from '@components/icon/MyIcon';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  postId: string;
  likes: string[];
}

const ImageItem = ({
  uri,
  index,
  scrollX,
  containerWidth,
}: {
  uri: string;
  index: number;
  scrollX: Animated.SharedValue<number>;
  containerWidth: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    if (containerWidth === 0) {
      return {};
    }

    const inputRange = [
      (index - 1) * containerWidth,
      index * containerWidth,
      (index + 1) * containerWidth,
    ];

    const scale = interpolate(scrollX.value, inputRange, [0.9, 1, 0.9], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });

    const opacity = interpolate(scrollX.value, inputRange, [0.7, 1, 0.7], {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    });

    return {
      transform: [{scale}],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        tw.style('justify-center items-center'),
        {width: containerWidth},
        animatedStyle,
      ]}>
      <Image
        source={{uri}}
        style={tw.style('w-full h-64 rounded-2xl')}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const Dot = ({index, currentIndex}: {index: number; currentIndex: number}) => {
  const isActive = index === currentIndex;

  return (
    <View
      style={[
        tw`h-2 w-2 mx-1 rounded-full`,
        isActive ? tw`bg-orange-500 w-3` : tw`bg-gray-300`,
      ]}
    />
  );
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  postId,
  likes,
}) => {
  const [containerWidth, setContainerWidth] = useState(SCREEN_WIDTH);
  const scrollX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tính toán index hiện tại từ scroll position
  useDerivedValue(() => {
    if (containerWidth > 0) {
      const newIndex = Math.round(scrollX.value / containerWidth);
      runOnJS(setCurrentIndex)(newIndex);
    }
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const handleDoubleTap = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId || !postId) {
      return;
    }

    const postRef = firestore().collection('posts').doc(postId);
    const alreadyLiked = likes.includes(userId);

    try {
      await postRef.update({
        likes: alreadyLiked
          ? firestore.FieldValue.arrayRemove(userId)
          : firestore.FieldValue.arrayUnion(userId),
      });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const triggerHeartAnimation = () => {
    scale.value = withSpring(1.5, {damping: 2}, () => {
      scale.value = withTiming(0);
    });
    opacity.value = withTiming(1, {duration: 100}, () => {
      opacity.value = withTiming(0);
    });
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      runOnJS(triggerHeartAnimation)();
      runOnJS(handleDoubleTap)();
    });

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={tw.style('mb-3 flex-1')} onLayout={onLayout}>
      <GestureDetector gesture={doubleTapGesture}>
        <Animated.View style={tw.style('relative')}>
          <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}>
            {images.map((uri, index) => (
              <ImageItem
                key={index}
                uri={uri}
                index={index}
                scrollX={scrollX}
                containerWidth={containerWidth}
              />
            ))}
          </Animated.ScrollView>

          {/* Heart animation */}
          <Animated.View
            style={[
              tw.style('absolute top-1/2 left-1/2 -mt-9 -ml-9'),
              animatedHeartStyle,
            ]}>
            <MyIcon
              iconFontType="AntDesign"
              name="heart"
              size={72}
              color="red"
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>

      {/* Dot indicator */}
      {/* Dot indicator - Đơn giản hóa */}
      <View style={tw`flex-row justify-center mt-2`}>
        {images.map((_, index) => (
          <Dot key={index} index={index} currentIndex={currentIndex} />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
