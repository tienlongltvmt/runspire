import {View, Text, Image, Button, Alert} from 'react-native';
import React from 'react';
// import {RootStackParamList} from '../../navigation/RouterParam';
// import {RouteProp, useRoute} from '@react-navigation/core';
import {useUserStore} from '@store/userStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import NavigationService from '@navigation/NavigationService';

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function Home() {
  // const route = useRoute<HomeScreenRouteProp>();
  const user = useUserStore(state => state.user);
  console.log('Home screen user:', user);
  const logout = async () => {
    NavigationService.replace('Login');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => Alert.alert('Your are signed out!'));
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Hello, {user?.fullName}</Text>
      <Image source={{uri: user?.avatar}} style={{width: 60, height: 60}} />
      <Text>Home</Text>
      <Button onPress={logout} title="LogOut" color="red" />
    </SafeAreaView>
  );
}
