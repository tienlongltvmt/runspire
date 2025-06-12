import firestore from '@react-native-firebase/firestore';
import {AppUser} from '../types/user';

const usersCollection = firestore().collection('users');

export const UserService = {
  /**
   * Tạo hoặc cập nhật người dùng từ thông tin đăng nhập
   * @param userInfo thông tin trả về sau khi đăng nhập
   */
  async createOrUpdateUser(userInfo: {
    uid: string;
    provider: 'google' | 'facebook' | 'tiktok';
    email: string;
    fullName: string;
    avatar: string;
  }): Promise<AppUser> {
    const now = Date.now();
    const userRef = usersCollection.doc(userInfo.uid);
    const userSnap = await userRef.get();

    if (userSnap.exists()) {
      // ✅ Đã có user: cập nhật thời gian đăng nhập
      await userRef.update({
        lastLoginAt: now,
        avatar: userInfo.avatar, // cập nhật avatar mới nhất
        fullName: userInfo.fullName,
      });
    } else {
      // 🆕 Tạo user mới
      const newUser: AppUser = {
        ...userInfo,
        createdAt: now,
        lastLoginAt: now,
        stats: {
          totalCalories: 0,
          totalSteps: 0,
          totalRuns: 0,
          totalDistanceKm: 0,
        },
        friends: [],
        blockedUsers: [],
      };
      await userRef.set(newUser).then(() => {
        console.log('User created successfully');
      });
    }

    const updatedSnap = await userRef.get();
    console.log(
      'Updated user snapshot:',
      updatedSnap.exists,
      updatedSnap.data(),
    );
    return updatedSnap.data() as AppUser;
  },

  /**
   * Lấy thông tin người dùng
   */
  async getUser(uid: string): Promise<AppUser | null> {
    const doc = await usersCollection.doc(uid).get();
    return doc.exists() ? (doc.data() as AppUser) : null;
  },

  /**
   * Cập nhật profile người dùng
   */
  async updateProfile(uid: string, data: Partial<AppUser>) {
    await usersCollection.doc(uid).update(data);
  },
};
