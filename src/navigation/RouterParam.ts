// Định nghĩa kiểu params cho từng màn hình
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  MainStack: undefined;
  CreatedPostCommunity: undefined;
};

// Kiểu cho navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
