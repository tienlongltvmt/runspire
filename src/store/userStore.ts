import {AppUser} from '@types/user';
import {create} from 'zustand';

interface UserState {
  user: AppUser | null;
  setUser: (user: AppUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,

  setUser: user => set({user}),

  clearUser: () => set({user: null}),
}));
