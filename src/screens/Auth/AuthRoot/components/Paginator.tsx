import {colors} from '@ui/core/theme';
import React from 'react';
import {Animated, StyleSheet, View, useWindowDimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const smallSize = [10, 25, 10];
const largeSize = [20, 50, 20];

const Paginator = ({data, scrollX, size}: any) => {
  const {width} = useWindowDimensions();

  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: size === 'large' ? largeSize : smallSize,
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

Paginator.defaultProps = {
  size: 'large',
};

const styles = StyleSheet.create({
  dot: {
    height: 5,
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    marginHorizontal: moderateScale(4),
  },
});

export default Paginator;
