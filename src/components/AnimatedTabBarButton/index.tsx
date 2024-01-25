import useApplication from '@hooks/useApplication';
import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

const AnimatedTabBarButton = ({children, ...others}: any) => {
  const scale = useRef(new Animated.Value(1));
  const {currentScreen} = useApplication();

  const animateButton = () => {
    Animated.spring(scale.current, {
      toValue: 0.2,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.spring(scale.current, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
      // scale.current.setValue(1);
    }, 200);
  };

  useEffect(() => {
    if (currentScreen === others.name) {
      animateButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreen]);
  return (
    <Animated.View style={{transform: [{scale: scale.current}]}}>
      {children}
    </Animated.View>
  );
};

export default AnimatedTabBarButton;
