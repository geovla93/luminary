import {Typography} from '@ui/core/components';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from 'react-native';

const LoadingScreen = () => {
  const logoAnimation = useRef(new Animated.Value(0)).current;
  const logoSlideOutAnimation = useRef(new Animated.Value(0)).current;
  const secondImageAnimation = useRef(new Animated.Value(0)).current;
  const partnerAnimation = useRef(new Animated.Value(0)).current;

  const pulseAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Rotate and scale up
      Animated.timing(logoAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // 2. Slide left and fade out
      Animated.timing(logoSlideOutAnimation, {
        toValue: 1,
        duration: 500,
        delay: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // 3. Slide in from right and fade in
      Animated.timing(secondImageAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // 4. Fade in partner logo
      Animated.timing(partnerAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.sin,
          useNativeDriver: true,
        }),
      ),
    ]).start();
  }, [logoAnimation, logoSlideOutAnimation, secondImageAnimation]);

  return (
    <ImageBackground source={require('@assets/splash.png')} style={styles.root}>
      <View style={styles.animationContainer}>
        <Animated.Image
          source={require('@assets/logo.png')}
          style={{
            ...styles.logo,
            opacity: logoSlideOutAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0], // fade out logo
            }),
            transform: [
              {
                translateX: logoSlideOutAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -300], // slide left
                }),
              },
              {
                rotate: logoAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'], // rotate 360 degrees
                }),
              },
              {
                scale: logoAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.5, 1], // scale up and down
                }),
              },
            ],
          }}
        />
        <Animated.Image
          source={require('@assets/logo-text.png')}
          style={{
            ...styles.logoText,
            opacity: secondImageAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1], // fade in second image
            }),
            transform: [
              {
                translateX: secondImageAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0], // slide from right to left
                }),
              },
              {
                scale: pulseAnimation.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [1, 1.2, 1], // scale up and down
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.partnerContainer,
            opacity: secondImageAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1], // fade in second image
            }),
          }}>
          <Typography textAlign="center" fontWeight="bold" color="white">
            Verified by
          </Typography>
          <Image
            style={styles.partnerLogo}
            source={require('@assets/cyberscope.png')}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    position: 'absolute',
  },
  logoText: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  partnerContainer: {
    position: 'absolute',
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  partnerLogo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    bottom: 0,
  },
});

export default LoadingScreen;
