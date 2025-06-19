import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppUser} from '@typesR/user';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface UserState {
  user: AppUser | null;
  setUser: (user: AppUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({user}),
      clearUser: () => set({user: null}),
    }),
    {
      name: 'app-user-storage', // Tên key trong AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Sử dụng AsyncStorage
    },
  ),
);
