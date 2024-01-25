import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';

const SpinningIcon = ({name, size, color}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // Durata de rotație completă în milisecunde
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  // Mapează valorile interpolate
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotație de la 0 la 360 grade
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <Icon name={name} size={size} color={color} />
    </Animated.View>
  );
};

export default SpinningIcon;
