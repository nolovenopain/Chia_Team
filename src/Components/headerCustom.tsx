/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {Platform, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Ionicons, MaterialIcons} from './iconCustom';
import LinearGradient from 'react-native-linear-gradient';
import {
  font12,
  headerHeight,
  iconSize24,
  px5,
  statusHeight,
  width,
} from '../Constants';
import {FontCustom, TextCus} from './textCustom';
import {ButtonCus} from './buttonCustom';
import {Color} from '../Utils';

interface HeaderCusProps {
  isBack?: boolean;
  isClose?: boolean;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  title?: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleIconBack?: StyleProp<TextStyle>;
  styleIconClose?: StyleProp<TextStyle>;
  styleRightComponent?: StyleProp<ViewStyle>;
  styleLeftComponent?: StyleProp<ViewStyle>;
  children?: ReactNode;
  sizeBack?: number;
  colorBack?: string;
  sizeClose?: number;
  colorClose?: string;
  colorGardients?: (string | number)[];
}

export const HeaderCus: React.FC<HeaderCusProps> = ({
  isBack = false,
  isClose = false,
  rightComponent = null,
  leftComponent = null,
  title,
  styleContainer,
  styleTitle,
  styleIconBack,
  styleIconClose,
  styleRightComponent,
  styleLeftComponent,
  children,
  sizeBack = iconSize24 * 1.2,
  colorBack,
  sizeClose,
  colorClose,
  colorGardients,
}) => {
  const _render = () => {
    return (
      <View
        style={{
          height: headerHeight + (Platform.OS == 'android' ? statusHeight : 0),
          width,
          justifyContent: 'flex-end',
          marginTop: Platform.OS == 'ios' ? statusHeight : px5,
          paddingBottom: px5 * 2,
        }}>
        {children ? (
          children
        ) : (
          <TextCus
            style={[
              {
                fontSize: font12 * 2,
                textAlign: 'center',
                fontFamily: FontCustom.Arial,
                paddingHorizontal: px5 * 12,
              },
              styleTitle,
            ]}
            numberOfLines={1}>
            {title ? title : ''}
          </TextCus>
        )}
        <>
          <View
            style={{
              position: 'absolute',
              bottom: Platform.OS == 'android' ? px5 : 0,
              justifyContent: 'center',
              flexDirection: 'row',
              left: Platform.OS == 'android' ? px5 * 2 : 0,
            }}>
            {isBack ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: Platform.OS == 'android' ? px5 : px5 * 2,
                  paddingLeft: Platform.OS == 'android' ? 0 : px5,
                  marginLeft: px5 * 2.5,
                }}
                children={
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={sizeBack}
                    color={colorBack}
                    style={styleIconBack}
                  />
                }
                onPress={() => {}}
              />
            ) : null}
            {isClose ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                children={
                  <Ionicons
                    name="close"
                    size={sizeClose}
                    color={colorClose}
                    style={styleIconClose}
                  />
                }
                onPress={() => {}}
              />
            ) : null}
          </View>
          {leftComponent != null && (
            <View
              style={[
                {
                  position: 'absolute',
                  left: px5 * 2,
                  justifyContent: 'center',
                  paddingBottom: px5 * 2,
                },
                styleLeftComponent,
              ]}>
              {leftComponent}
            </View>
          )}
          {rightComponent != null && (
            <View
              style={[
                {
                  position: 'absolute',
                  right: px5 * 2,
                  justifyContent: 'center',
                  paddingBottom: px5 * 2,
                },
                styleRightComponent,
              ]}>
              {rightComponent}
            </View>
          )}
        </>
      </View>
    );
  };

  return (
    <View>
      {colorGardients ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={colorGardients}
          style={[
            {
              width: '100%',
            },
            styleContainer,
          ]}>
          {_render()}
        </LinearGradient>
      ) : (
        <View
          style={[
            {
              width: '100%',
            },
            styleContainer,
          ]}>
          {_render()}
        </View>
      )}
    </View>
  );
};
