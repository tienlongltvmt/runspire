// Định nghĩa kiểu params cho từng màn hình
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
};

// Kiểu cho navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
