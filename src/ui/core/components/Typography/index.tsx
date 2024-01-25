import React, {PropsWithChildren} from 'react';
import {TextStyle} from 'react-native';

import {Text} from 'react-native-paper';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

type ITypography = PropsWithChildren<{
  sx?: TextStyle | TextStyle[];
  variant?: VariantProp<string>;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontWeight?: 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700';
  color?: string;
}>;

const Typography = ({
  children,
  sx,
  variant,
  fontWeight,
  textAlign,
  color,
}: ITypography) => {
  const others: any = {};
  if (fontWeight) {
    others.fontWeight = fontWeight;
  }
  if (color) {
    others.color = color;
  }

  return (
    <Text variant={variant} style={[sx, {textAlign, ...others}]}>
      {children}
    </Text>
  );
};

Typography.defaultProps = {
  sx: {},
  variant: 'bodyMedium',
  textAlign: 'auto',
};

export default Typography;
