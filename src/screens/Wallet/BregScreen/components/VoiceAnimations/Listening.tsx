import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

const Listening = () => {
  // Animated value for opacity
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  // Pulsating animation to mimic listening
  const startListeningAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1, // Fully visible
          duration: 700, // Duration of fade in
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5, // Partially visible
          duration: 700, // Duration of fade out
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startListeningAnimation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={require('@assets/breg_background.png')}
        style={{
          resizeMode: 'contain',
          opacity: opacityAnim, // Apply animated opacity
        }}
      />
    </View>
  );
};

export default Listening;
