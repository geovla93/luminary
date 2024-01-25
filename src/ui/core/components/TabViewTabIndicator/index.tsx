import {NavigationState, SceneRendererProps} from 'react-native-tab-view';
import {Animated, I18nManager, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '@ui/core/theme';

type Route = {
  key: string;
  icon: React.ComponentProps<any>['name'];
};
type State = NavigationState<Route>;

const TabViewTabIndicator = (
  props: SceneRendererProps & {
    navigationState: State;
    getTabWidth: (i: number) => number;
  },
) => {
  const {position, navigationState, getTabWidth} = props;
  const inputRange = [0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2];

  const scale = position.interpolate({
    inputRange,
    outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
  });

  const opacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map(x => {
      const d = x - Math.trunc(x);
      return d === 0.49 || d === 0.51 ? 0 : 1;
    }),
  });

  const translateX = position.interpolate({
    inputRange: inputRange,
    outputRange: inputRange.map(x => {
      const i = Math.round(x);
      return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
    }),
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: `${100 / navigationState.routes.length}%`,
          transform: [{translateX}] as any,
        },
      ]}>
      <Animated.View
        style={[styles.indicator, {opacity, transform: [{scale}]} as any]}
      />
    </Animated.View>
  );
};

export default TabViewTabIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: colors.primary,
    width: 60,
    height: 1,
    borderRadius: 0,
    marginBottom: 0,
    marginTop: 25,
  },
});
