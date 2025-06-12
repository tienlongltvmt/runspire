// src/navigation/NavigationService.ts
import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import {createRef} from 'react';
// 1. Định nghĩa kiểu cho tất cả các route trong app
import {RootStackParamList} from './RouterParam';

// 2. Khởi tạo navigation ref
export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

// 3. NavigationService với đầy đủ phương thức điều hướng
const NavigationService = {
  // ===== CÁC PHƯƠNG THỨC ĐIỀU HƯỚNG CƠ BẢN =====

  // Điều hướng đến màn hình
  navigate: <RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(name, params);
    }
  },

  // Thay thế màn hình hiện tại
  replace: <RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.dispatch(StackActions.replace(name, params));
    }
  },

  // Quay lại màn hình trước
  goBack: () => {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current.goBack();
    }
  },

  // ===== QUẢN LÝ STACK =====

  // Reset toàn bộ stack
  resetStack: <RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.reset({
        index: 0,
        routes: [{name, params}],
      });
    }
  },

  // Pop về đầu stack
  popToTop: () => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.dispatch(StackActions.popToTop());
    }
  },

  // Đẩy một màn hình mới lên stack
  push: <RouteName extends keyof RootStackParamList>(
    name: RouteName,
    params?: RootStackParamList[RouteName],
  ) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.dispatch(StackActions.push(name, params));
    }
  },

  // Pop n màn hình
  pop: (count: number = 1) => {
    if (
      navigationRef.current?.isReady() &&
      navigationRef.current?.canGoBack()
    ) {
      navigationRef.current.dispatch(StackActions.pop(count));
    }
  },

  // ===== QUẢN LÝ TRẠNG THÁI =====

  // Kiểm tra có thể go back không
  canGoBack: (): boolean => {
    return navigationRef.current?.canGoBack() || false;
  },

  // Lấy route hiện tại
  getCurrentRoute: () => {
    if (navigationRef.current?.isReady()) {
      return navigationRef.current.getCurrentRoute();
    }
    return null;
  },

  // Kiểm tra đang ở route nào
  isCurrentRoute: (routeName: keyof RootStackParamList): boolean => {
    const currentRoute = NavigationService.getCurrentRoute();
    return currentRoute?.name === routeName;
  },

  // ===== ĐIỀU HƯỚNG NÂNG CAO =====

  // Dispatch action tùy chỉnh
  dispatch: (action: any) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.dispatch(action);
    }
  },

  // Lấy root state
  getRootState: () => {
    if (navigationRef.current?.isReady()) {
      return navigationRef.current.getRootState();
    }
    return null;
  },

  // ===== QUẢN LÝ NAVIGATOR CON =====

  // Điều hướng trong nested navigator
  navigateInNested: <
    ParentRoute extends keyof RootStackParamList,
    ChildRoute extends keyof RootStackParamList[ParentRoute] extends {
      screen: infer S;
    }
      ? S
      : never,
  >(
    parent: ParentRoute,
    child: ChildRoute,
    params?: any,
  ) => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(parent, {
        screen: child,
        params,
      });
    }
  },
};

export default NavigationService;
