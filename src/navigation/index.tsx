import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';
import {RootStackParamList} from './RouterParam';
import Login from '@screens/auth/Login';
import {navigationRef} from './NavigationService';
import RouterBottom from './RouterBottom';
import CreatedPostCommunity from '@screens/community/CreatedPostCommunity';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function AppNavigator() {
  // Sử dụng generic type với Stack Navigator
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => console.log('Navigation is ready')}
        onStateChange={state => console.log('New navigation state', state)}>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            // animation: 'fade',
            headerTintColor: '#3A4D39',
            headerBackButtonDisplayMode: 'minimal',
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
            name="MainStack"
            component={RouterBottom}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="CreatedPostCommunity"
            component={CreatedPostCommunity}
            options={{
              // headerShown: false,
              headerTitle: 'Created Post',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
