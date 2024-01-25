import React from 'react';
import {Alert, Animated, TouchableOpacity} from 'react-native';

const PausedAnimation = ({onPress}: any) => {
  // Opacity for the dimming effect
  const opacity = 0.5; // You can adjust this value as needed

  return (
    <TouchableOpacity onPress={() => onPress()} style={{flex: 1}}>
      <Animated.Image
        source={require('@assets/breg_background.png')}
        style={{
          resizeMode: 'contain',
          opacity: opacity, // Apply a lower opacity for a dimmed look
        }}
      />
    </TouchableOpacity>
  );
};

export default PausedAnimation;
