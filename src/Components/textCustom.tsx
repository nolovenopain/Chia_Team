import React, {ReactNode} from 'react';
import {
  Text as TextRN,
  StyleSheet,
  Platform,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native';
import {font14} from '../Constants';
import {Color} from '../Utils';

interface TextCusProps extends TextProps {
  selectable?: boolean;
  scaleFontSize?: number;
  text?: string;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

export const FontCustom = {
  Arial: Platform.select({
    android: 'arial',
    ios: 'arial',
  }),
};

export const TextCus: React.FC<TextCusProps> = ({
  selectable = false,
  scaleFontSize = 1,
  style,
  text,
  children,
  ...props
}) => {
  var _style = style;
  var styleCus = StyleSheet.flatten<TextStyle>([
    {
      color: Color.baseText,
      fontSize: font14,
      fontFamily: FontCustom.Arial,
    },
    _style,
  ]);
  if (text != null) {
    children = text;
  }

  styleCus.fontSize = (styleCus.fontSize || font14) * scaleFontSize;

  return (
    <TextRN
      {...props}
      allowFontScaling={false}
      selectable={selectable}
      style={styleCus}>
      {children}
    </TextRN>
  );
};
