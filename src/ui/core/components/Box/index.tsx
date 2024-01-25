import React from 'react';
import {Animated, ScrollView, View, ViewStyle} from 'react-native';

interface IBox {
  children: React.ReactNode;
  sx?: ViewStyle;
  testID?: string;
}

interface IBoxScrollView extends IBox {
  [key: string]: any;
}

interface IBoxAnimated extends IBox {
  [key: string]: any;
}

const Box = ({children, sx, testID}: IBox) => {
  return (
    <View testID={testID} style={sx}>
      {children}
    </View>
  );
};

Box.ScrollView = ({children, sx, testID, ...others}: IBoxScrollView) => {
  return (
    <ScrollView {...others} testID={testID} style={sx}>
      {children}
    </ScrollView>
  );
};

Box.View = ({children, ...others}: IBox) => {
  return <Box {...others}>{children}</Box>;
};

Box.Animated = ({children, ...others}: IBoxAnimated) => {
  return <Animated.View {...others}>{children}</Animated.View>;
};

export default Box;
