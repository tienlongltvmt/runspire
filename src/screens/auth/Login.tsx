// src/screens/Auth/LoginScreen.tsx
import NavigationService from '@navigation/NavigationService';
import {AuthService} from '@services/AuthService';
import React from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useUserStore} from '@store/userStore';
import tw from '@utils/tailwind';

export default function LoginScreen({navigation}: any) {
  const {setUser} = useUserStore();

  const handleGoogleLogin = async () => {
    try {
      const reqUser = await AuthService.signInWithGoogle();
      setUser(reqUser);

      NavigationService.replace('Home');
    } catch (error) {
      Alert.alert('Google Login Error', String(error));
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await AuthService.signInWithFacebook();
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Facebook Login Error', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập để bắt đầu chạy</Text>
      <TouchableOpacity
        onPress={handleGoogleLogin}
        style={tw.style(
          `bg-blue-500 p-4 rounded-lg flex-row items-center justify-center`,
        )}>
        <Text>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {fontSize: 20, textAlign: 'center', marginBottom: 20},
});
