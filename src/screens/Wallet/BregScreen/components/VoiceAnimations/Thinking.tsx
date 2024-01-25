import React, {useEffect, useRef} from 'react';
import {Animated, View, Easing} from 'react-native';

const Thinking = () => {
  // Create an animated value for the rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Create an animated value for the scale (pulsating effect)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animation for rotation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  // Animation for pulsating
  const pulsate = scaleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1], // Scale from 1 to 1.2 to 1
  });

  useEffect(() => {
    // Looping rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();

    // Looping pulsating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [rotateAnim, scaleAnim]);

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={require('@assets/breg_background.png')}
        style={{
          resizeMode: 'contain',
          opacity: 0.8,
          marginTop: 100,
          transform: [{rotate: rotation}, {scale: pulsate}],
        }}
      />
    </View>
  );
};

export default Thinking;
