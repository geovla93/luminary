import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '@ui/core/theme';
import Animated from 'react-native-reanimated';

const WalletTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={route.key}
            onLongPress={onLongPress}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
              paddingHorizontal: 20,
              marginHorizontal: 10,
              borderBottomWidth: 2,
              borderBottomColor: isFocused ? colors.primary : 'transparent',
            }}>
            <View>
              <Animated.Text style={{color: 'white'}}>{label}</Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WalletTabBar;
