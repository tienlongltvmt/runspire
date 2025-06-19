/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/homeScreen/Home';
import {MyIcon} from '@components/icon/MyIcon';
import Community from '@screens/community/Community';
import Profile from '@screens/profile/Profile';
import Run from '@screens/run/Run';

const BottomStack = createBottomTabNavigator();

const inactiveTintColor: string = '#E5D2B8';
const activeTintColor: string = '#809671';

export default function RouterBottom() {
  return (
    <BottomStack.Navigator
      screenOptions={{
        lazy: true,
        // headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontFamily: 'monospace',
          fontSize: 16,
        },
      }}
      initialRouteName="Home">
      <BottomStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: props => (
            <MyIcon
              name="home"
              iconFontType="AntDesign"
              size={24}
              color={props.focused ? activeTintColor : inactiveTintColor}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name="Community"
        component={Community}
        options={{
          title: 'Community',
          headerTitle: 'Community',
          tabBarIcon: props => (
            <MyIcon
              name="book-medical"
              iconFontType="FontAwesome5"
              size={24}
              color={props.focused ? activeTintColor : inactiveTintColor}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name="Run"
        component={Run}
        options={{
          title: 'Lets Run',
          tabBarIcon: props => (
            <MyIcon
              name="running"
              iconFontType="FontAwesome5"
              size={24}
              color={props.focused ? activeTintColor : inactiveTintColor}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: props => (
            <MyIcon
              name="running"
              iconFontType="FontAwesome5"
              size={24}
              color={props.focused ? activeTintColor : inactiveTintColor}
            />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
}
