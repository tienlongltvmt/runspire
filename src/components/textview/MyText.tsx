import tw from '@utils/tailwind';
import React from 'react';
import {Text, TextProps} from 'react-native';

export interface IMyTextProps extends TextProps {
  children?: any | null;
}
/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 *
 */
export function MyText(props: IMyTextProps) {
  const {children, style} = props;

  return (
    <Text
      {...props}
      style={[tw.style('text-black text-sm'), style]}
      allowFontScaling={false}>
      {children}
    </Text>
  );
}
