import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

const Speaking = () => {
  // Animated value for scaling
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pulsating animation to mimic speaking
  const startSpeakingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // Slightly larger scale
          duration: 500, // Duration of one pulse
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Original scale
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startSpeakingAnimation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={require('@assets/breg_background.png')}
        style={{
          resizeMode: 'contain',
          transform: [{scale: scaleAnim}],
        }}
      />
    </View>
  );
};

export default Speaking;
