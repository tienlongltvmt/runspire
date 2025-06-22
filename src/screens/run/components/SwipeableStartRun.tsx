/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Dimensions, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withDelay,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import tw from '@utils/tailwind';

const {width} = Dimensions.get('window');
const SLIDER_WIDTH = width - 32;
const CIRCLE_SIZE = 52;
const PADDING_RIGHT = 12;
const MAX_TRANSLATE_X = SLIDER_WIDTH - CIRCLE_SIZE - PADDING_RIGHT;

type Props = {
  label?: string;
  icon?: string;
  onSlideComplete: () => void;
  colors?: string[];
};

const Arrow = ({delay}: {delay: number}) => {
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withDelay(
      delay,
      withRepeat(withTiming(1, {duration: 700}), -1, true),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 1], [0.2, 1]),
    transform: [
      {
        scale: interpolate(anim.value, [0, 1], [0.8, 1]),
      },
    ],
    marginLeft: 2,
  }));

  return (
    <Animated.View style={style}>
      <Icon name="chevron-right" size={18} color="white" />
    </Animated.View>
  );
};

const SwipeableStartRun = ({
  label = 'Slide to start run',
  icon = 'chevron-right',
  onSlideComplete,
  colors = ['#4facfe', '#00f2fe'],
}: Props) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()

    .onUpdate(e => {
      if (e.translationX >= 0 && e.translationX <= MAX_TRANSLATE_X) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value >= MAX_TRANSLATE_X * 0.6) {
        translateX.value = withSpring(MAX_TRANSLATE_X);
        runOnJS(onSlideComplete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const textOpacity = useAnimatedStyle(() => ({
    opacity: 1 - translateX.value / MAX_TRANSLATE_X,
  }));

  return (
    <GestureHandlerRootView
      style={tw.style('justify-center items-center mb-4')}>
      <GestureDetector gesture={gesture}>
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            tw.style('rounded-full overflow-hidden justify-center pl-1'),
            {width: SLIDER_WIDTH, height: 58},
          ]}>
          {/* Text + animated arrows */}
          <Animated.View
            style={[
              tw.style(
                'absolute w-full flex-row items-center justify-center z-10',
              ),
              textOpacity,
            ]}>
            <Text style={tw.style('text-white font-semibold mr-2')}>
              {label}
            </Text>
            <Arrow delay={0} />
            <Arrow delay={150} />
            <Arrow delay={300} />
          </Animated.View>

          {/* Slider handle */}
          <Animated.View
            style={[
              tw.style(
                'bg-white  rounded-full justify-center items-center z-20 ',
              ),
              {
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              },
              circleStyle,
            ]}>
            <Icon name={icon} size={24} color="#4facfe" />
          </Animated.View>
        </LinearGradient>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SwipeableStartRun;
