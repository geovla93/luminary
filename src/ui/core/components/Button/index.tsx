import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

import {ButtonProps, Button as PaperBtn} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {verticalScale} from 'react-native-size-matters';

type IButton = PropsWithChildren<{
  sx?: ButtonProps['style'];
  variant?: ButtonProps['mode'];
  textColor?: string;
  buttonColor?: string;
  disabled?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  onLongPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  icon: IconSource;
  uppercase?: boolean;
  contentStyle?: ButtonProps['contentStyle'];
  labelStyle?: ButtonProps['labelStyle'];
  testID?: string;
}>;

const Button = ({
  children,
  variant,
  sx,
  size,
  textColor,
  buttonColor,
  disabled,
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityHint,
  icon,
  uppercase,
  labelStyle,
  testID,
}: IButton) => {
  let btnStyle = styles.root;
  if (size === 'small') {
    btnStyle = styles.small;
  }
  if (size === 'medium') {
    btnStyle = styles.medium;
  }

  return (
    <PaperBtn
      testID={testID}
      textColor={textColor}
      buttonColor={buttonColor}
      disabled={disabled}
      style={{...(sx as object)}}
      onPress={onPress}
      icon={icon}
      onLongPress={onLongPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      uppercase={uppercase}
      labelStyle={{...btnStyle, ...(labelStyle as object)}}
      mode={variant}>
      {children}
    </PaperBtn>
  );
};

Button.defaultProps = {
  sx: {},
  variant: 'contained',
  disabled: false,
  onPress: () => {},
  onLongPress: () => {},
  accessibilityLabel: '',
  accessibilityHint: '',
  icon: '',
  uppercase: false,
  labelStyle: {},
  contentStyle: {},
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: verticalScale(8),
  },
  medium: {
    paddingVertical: verticalScale(4),
  },
  small: {
    paddingVertical: verticalScale(0),
  },
});

export default Button;
