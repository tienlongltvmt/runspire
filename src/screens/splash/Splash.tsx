// SplashScreen.tsx

import tw from '@utils/tailwind';
import React, {useEffect} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

// Số lượng icon rơi
const NUMBER_OF_ICONS = 10;

const Splash = () => {
  const icons = React.useRef(
    Array.from({length: NUMBER_OF_ICONS}).map(() => ({
      x: Math.random() * (width - 50), // Random vị trí ngang
      animation: new Animated.Value(-50), // Bắt đầu ở trên ngoài màn hình
      duration: 2000 + Math.random() * 2000, // Random thời gian rơi
    })),
  ).current;

  useEffect(() => {
    icons.forEach(icon => {
      Animated.timing(icon.animation, {
        toValue: height - 80, // điểm gần chạm bao
        duration: icon.duration,
        useNativeDriver: true,
      }).start();
    });
  }, [icons]);

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <Animated.View
          key={index}
          style={[
            styles.icon,
            {
              transform: [{translateY: icon.animation}],
              left: icon.x,
            },
          ]}>
          <View style={tw.style('w-2 h-2 rounded-full bg-red-200')} />
        </Animated.View>
      ))}

      <View
        style={tw.style(
          'w-full h-20 rounded-full bg-red-200 absolute bottom-3',
        )}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // màu nền nhẹ nhàng
  },
  icon: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  bag: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 120,
    height: 80,
  },
});
