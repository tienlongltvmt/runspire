import React from 'react';
import {View} from 'react-native';
import type {IconProps} from 'react-native-vector-icons/Icon';

// Import tất cả các icon sets
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

// Định nghĩa kiểu cho các icon sets
export type FontType =
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

// Props của component mở rộng từ IconProps và thêm iconFontType
interface MyIconProps extends IconProps {
  iconFontType: FontType;
}

// Tạo map ánh xạ giữa tên icon set và component
const iconComponents: Record<FontType, React.ComponentType<IconProps>> = {
  Ionicons: Ionicons,
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Feather: Feather,
  FontAwesome: FontAwesome,
  FontAwesome5: FontAwesome5,
  Fontisto: Fontisto,
  Foundation: Foundation,
  MaterialCommunityIcons: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  Octicons: Octicons,
  SimpleLineIcons: SimpleLineIcons,
  Zocial: Zocial,
};

export const MyIcon = (props: MyIconProps) => {
  const {iconFontType, ...iconProps} = props;

  // Lấy component icon tương ứng
  const IconComponent = iconComponents[iconFontType];

  // Nếu không tìm thấy component hoặc iconFontType không hợp lệ, trả về View rỗng
  if (!IconComponent) {
    return <View />;
  }

  // Render component icon với các props
  return <IconComponent {...iconProps} />;
};
