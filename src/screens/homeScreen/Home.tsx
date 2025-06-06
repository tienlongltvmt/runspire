import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../navigation/RouterParam';
import {RouteProp, useRoute} from '@react-navigation/core';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function Home() {
  const route = useRoute<HomeScreenRouteProp>();
  const {userId} = route.params; // ✅ TypeScript tự động nhận kiểu
  console.log(userId);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
