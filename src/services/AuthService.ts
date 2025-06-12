// src/services/AuthService.ts
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {UserService} from './userService';

GoogleSignin.configure({
  webClientId:
    '48532360353-rkb7vr2a70m6ccaud9fnv7bt2u9astj3.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const AuthService = {
  async signInWithGoogle() {
    try {
      console.log('Starting Google Sign-In...');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('UserInfo:', userInfo);
      const {idToken} = userInfo.data as any;
      if (!idToken) {
        throw 'Không lấy được ID Token từ Google';
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const firebaseUser = await auth().signInWithCredential(googleCredential);

      const user = firebaseUser.user;
      console.log('Firebase user:', user);
      const appUser = await UserService.createOrUpdateUser({
        uid: user.uid,
        email: user.email ?? '',
        fullName: user.displayName ?? '',
        avatar: user.photoURL ?? '',
        provider: 'google',
      });

      // Trả về appUser để component gọi hàm này có thể lưu vào store
      return appUser;
    } catch (error: any) {
      console.error('Full Google sign-in error:', {
        code: error.code,
        message: error.message,
        nativeError: error.nativeErrorMessage,
      });
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw 'Bạn đã hủy đăng nhập.';
      } else if (error.code === 'auth/internal-error') {
        // Phân tích lỗi Firebase chi tiết
        if (error.message.includes('TOKEN_EXPIRED')) {
          throw 'Token đã hết hạn, vui lòng thử lại';
        }
        throw 'Lỗi hệ thống, vui lòng thử lại sau';
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw 'Bạn đã hủy đăng nhập.';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw 'Đang xử lý đăng nhập...';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw 'Thiếu Google Play Services';
      } else {
        console.error('Lỗi đăng nhập Google:', error);
        throw `Lỗi không xác định: ${error.message || error}`;
      }
    }
  },

  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      throw 'Lỗi khi đăng xuất.';
    }
  },

  getCurrentUser() {
    return auth().currentUser;
  },

  async signInWithFacebook() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
  },
};
