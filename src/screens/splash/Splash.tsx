import {MyText} from '@components/textview/MyText';
import {useNavigation} from '@react-navigation/core';
import tw from '@utils/tailwind';
import React, {useEffect} from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import NavigationService from '@navigation/NavigationService';

const RunningCommunityScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth().currentUser;
      // NavigationService.replace('Login');
      if (user) {
        NavigationService.replace('Home');
      } else {
        NavigationService.replace('Login');
      }
    }, 1500); // giả delay như splash animation

    return () => clearTimeout(timer);
  }, []);
  console.log('RunningCommunityScreen loaded');
  return (
    <View style={tw.style('flex-1 bg-black')}>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/736x/f7/2a/fc/f72afc870c34d616507c5dfd5503dea1.jpg',
        }}
        style={tw.style('flex-1 items-center justify-end')}
        resizeMode="cover">
        <LinearGradient
          colors={[
            'rgba(15,23,42,1)',
            'rgba(0,0,0,0.7)',
            'rgba(194,65,12 ,0.6)',
          ]}
          start={{x: 0.6, y: 0.6}}
          end={{x: 1, y: 1}}
          style={tw.style('rounded-2xl m-4')}>
          <View style={tw.style('rounded-lg p-6 bg-black/50')}>
            <MyText
              style={tw.style(
                'text-white text-2xl font-bold text-center mb-5 shadow-lg',
              )}>
              Connect with a Community of Runners
            </MyText>

            <MyText
              style={tw.style(
                'text-white/90 text-base text-center leading-7 mb-8',
              )}>
              Join a global network of runners and share your achievements.
              Challenge friends, participate in virtual races, and celebrate
              your progress together.
            </MyText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={tw.style(
                'bg-orange-500 py-3 rounded-full items-center mb-6 shadow-lg',
              )}>
              <MyText style={tw.style('text-white text-lg font-semibold')}>
                Get Started
              </MyText>
            </TouchableOpacity>

            <View style={tw.style('flex-row justify-center items-center')}>
              <MyText style={tw.style('text-white/70 text-base')}>
                Already Have an account?
              </MyText>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Login'); // Navigate to Login screen
                }}>
                <MyText
                  style={tw.style(
                    'text-orange-500 text-base font-semibold underline ml-1',
                  )}>
                  Login
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default RunningCommunityScreen;
