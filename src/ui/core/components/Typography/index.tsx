import React, {PropsWithChildren, useMemo} from 'react';
import {TextStyle} from 'react-native';
import {Text} from 'react-native-paper';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

type ITypography = PropsWithChildren<{
  sx?: TextStyle | TextStyle[];
  variant?: VariantProp<string>;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontWeight?: 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700';
  color?: string;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  onPress?: () => void | undefined | null;
}>;

const Typography = ({
  children,
  sx = {},
  variant = 'bodyMedium',
  textAlign = 'auto',
  fontWeight,
  color,
  mt,
  mb,
  mr,
  ml,
  pt,
  pb,
  pr,
  pl,
  onPress,
}: ITypography) => {
  const style = useMemo(
    () => ({
      ...sx,
      ...(textAlign ? {textAlign} : {}),
      ...(fontWeight ? {fontWeight} : {}),
      ...(color ? {color} : {}),
      ...(mt !== undefined ? {marginTop: mt} : {}),
      ...(mb !== undefined ? {marginBottom: mb} : {}),
      ...(mr !== undefined ? {marginRight: mr} : {}),
      ...(ml !== undefined ? {marginLeft: ml} : {}),
      ...(pt !== undefined ? {paddingTop: pt} : {}),
      ...(pb !== undefined ? {paddingBottom: pb} : {}),
      ...(pr !== undefined ? {paddingRight: pr} : {}),
      ...(pl !== undefined ? {paddingLeft: pl} : {}),
    }),
    [sx, textAlign, fontWeight, color, mt, mb, mr, ml, pt, pb, pr, pl],
  );

  return (
    <Text onPress={onPress} variant={variant} style={style}>
      {children}
    </Text>
  );
};

export default React.memo(Typography);
