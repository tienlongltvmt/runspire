import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';
import Home from '../screens/homeScreen/Home';
import {RootStackParamList} from './RouterParam';
import Login from '@screens/auth/Login';
import {navigationRef} from './NavigationService';

export default function AppNavigator() {
  // Sử dụng generic type với Stack Navigator
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => console.log('Navigation is ready')}
      onStateChange={state => console.log('New navigation state', state)}>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          // animation: 'fade',
          headerTintColor: '#3A4D39',
          headerBackVisible: false,
        }}>
        <RootStack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
