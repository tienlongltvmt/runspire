// Định nghĩa kiểu params cho từng màn hình
export type RootStackParamList = {
  Splash: undefined;
  Home: {
    userId: string;
    userName?: string; // Optional param
  };
};

// Kiểu cho navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
