import tw from '@utils/tailwind';
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserStore} from '@store/userStore';
import {MyIcon} from '@components/icon/MyIcon';
import {MyText} from '@components/textview/MyText';
import Geolocation from '@react-native-community/geolocation';
import {getCurrentWeather, WeatherData} from '@services/WeatherService';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const user = useUserStore(state => state.user);
  const currentHour = new Date().getHours();
  const isMorning = currentHour >= 5 && currentHour < 18;

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        async pos => {
          const data = await getCurrentWeather(
            pos.coords.latitude,
            pos.coords.longitude,
          );
          setWeather(data);
          console.log('Weather data:', data);
        },
        error => console.log('GetCurrentPosition Error', JSON.stringify(error)),
        {enableHighAccuracy: true},
      );
    };
    getCurrentPosition();
    // Lấy vị trí hiện tại

    // Cập nhật mỗi 10 phút
    const interval = setInterval(getCurrentPosition, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={tw.style('flex-1 bg-white')}>
      <ImageBackground
        blurRadius={10}
        source={{
          uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
        }}
        imageStyle={tw.style('w-full h-full ')}
        style={tw.style('w-full h-2/4 bg-slate-400')}>
        {/* Header */}

        <View
          style={tw.style('flex-row justify-end items-end px-4 ', {
            paddingTop: insets.top || 16,
          })}>
          <View style={tw.style('flex-row items-center')}>
            <Icon
              name="notifications-outline"
              size={24}
              style={tw.style('mr-3')}
            />
            <Image
              source={{uri: 'https://i.pravatar.cc/100'}}
              style={tw.style('w-8 h-8 rounded-full')}
            />
          </View>
        </View>

        {/* Title */}
        <MyText style={tw`text-2xl font-bold px-4`}>
          {isMorning ? 'Time to Run,' : 'Good Evening,'}{' '}
          {user?.fullName || 'User'}!
        </MyText>
        <View style={tw.style(' flex-row p-4 flex-1 mt-2 content-end')}>
          {/* Time Tag */}
          <View
            style={tw.style(
              'flex-row items-center bg-orange-100 self-start px-4 py-1 mt-2 rounded-full ',
            )}>
            <MyText style={tw.style('text-black font-semibold')}>
              {weather?.icon}{' '}
              {weather?.temperature
                ? `${Math.round(weather.temperature)}°C`
                : 'N/A'}
            </MyText>
          </View>
        </View>
      </ImageBackground>
      <View style={tw.style('flex-1 p-4')}>
        <MyText style={tw.style('text-lg font-bold mb-3')}>
          Latest Activities
        </MyText>

        <View style={tw.style('border border-gray-200  p-4 rounded-xl')}>
          {/* Card Header */}
          <View style={tw.style('flex-row items-center mb-4')}>
            <View style={tw.style('bg-orange-100 p-1.5 px-2 rounded-full')}>
              <MyIcon
                name="running"
                iconFontType="FontAwesome5"
                size={16}
                color={'orange'}
              />
            </View>
            <MyText style={tw.style('font-bold text-base flex-1 ml-2')}>
              Running
            </MyText>
            <View style={tw.style('flex-row items-center')}>
              <MyText style={tw.style('text-gray-500')}>6:30 AM</MyText>
              <MyIcon
                name="chevron-right"
                iconFontType="Feather"
                size={16}
                color={'#000'}
              />
            </View>
          </View>

          {/* Stats */}
          <View style={tw.style('flex-row justify-between')}>
            <View>
              <MyText style={tw.style('text-xl font-bold')}>1h15</MyText>
              <MyText style={tw.style('text-gray-500')}>Moving Time</MyText>
            </View>
            <View>
              <MyText style={tw.style('text-xl font-bold')}>10 km</MyText>
              <MyText style={tw.style('text-gray-500')}>Distance</MyText>
            </View>
            <View>
              <MyText style={tw.style('text-xl font-bold')}>3:21 /km</MyText>
              <MyText style={tw.style('text-gray-500')}>Avg Pace</MyText>
            </View>
          </View>

          {/* Streak Message */}
          <View style={tw.style('rounded-xl p-2 bg-gray-200 -m-3 mt-4')}>
            <View style={tw.style('flex-row items-center')}>
              <Icon name="flash-outline" size={16} color="#FF6B00" />
              <MyText style={tw.style('font-bold ml-2 ')}>
                14 days streak
              </MyText>
            </View>
            <MyText style={tw.style('text-sm mt-1 text-gray-500')}>
              - Keep it up, you are the best!
            </MyText>
          </View>
        </View>

        {/* Footer Cards */}
        <View style={tw.style('flex-row justify-between mt-6')}>
          <View
            style={tw.style(
              'flex-1 bg-yellow-100 p-4 rounded-xl items-center mr-2',
            )}>
            <Icon name="walk" size={20} color="#FFB800" />
            <MyText style={tw.style('mt-2 font-bold')}>Activity</MyText>
            <MyText style={tw.style('text-sm text-gray-600 mt-1')}>
              +5 Points
            </MyText>
          </View>
          <View
            style={tw.style(
              'flex-1 bg-red-100 p-4 rounded-xl items-center mr-2',
            )}>
            <Icon name="heart" size={20} color="#FF3D71" />
            <MyText style={tw.style('mt-2 font-bold')}>Heart</MyText>
            <MyText style={tw.style('text-sm text-gray-600 mt-1')}>
              1 of 9
            </MyText>
          </View>
          <View
            style={tw.style('flex-1 bg-teal-100 p-4 rounded-xl items-center')}>
            <Icon name="body" size={20} color="#00BFA6" />
            <MyText style={tw.style('mt-2 font-bold')}>Body</MyText>
            <MyText style={tw.style('text-sm text-gray-600 mt-1')}>
              Stable
            </MyText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
