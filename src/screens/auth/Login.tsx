import NavigationService from '@navigation/NavigationService';
import {AuthService} from '@services/AuthService';
import React from 'react';
import {View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useUserStore} from '@store/userStore';
import tw from '@utils/tailwind';
import {SvgXml} from 'react-native-svg';
import {logo_google} from '@assets/icons/svg';
import {MyText} from '@components/textview/MyText';

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
    <View style={tw.style('flex-1 justify-end p-5 bg-blue-400')}>
      <View style={tw.style('bg-white p-5 rounded-2xl shadow-lg self-end')}>
        <MyText style={tw.style('text-2xl font-bold  text-center')}>
          Welcome to RunSpire
        </MyText>
        <MyText style={tw.style('text-center text-base my-5')}>
          You're just one step away from tracking your runs and improving your
          fitness!
          {'\n'}Please login to continue.
        </MyText>
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={tw.style(
            'bg-gray-300 p-3 flex-row items-center justify-center rounded-full border-gray-300 my-4',
          )}>
          <SvgXml xml={logo_google} width="24" height="24" />
          <MyText style={tw.style('font-bold ml-4 text-gray-800')}>
            Login With Google
          </MyText>
        </TouchableOpacity>
        <MyText style={tw.style('text-center text-xs my-3')}>
          For more information, please see our{' '}
          <MyText style={tw.style('text-sm underline')}>Privacy policy</MyText>
        </MyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  title: {fontSize: 20, textAlign: 'center', marginBottom: 20},
});
