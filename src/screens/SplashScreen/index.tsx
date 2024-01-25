import {Typography} from '@ui/core/components';
import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, Image, View} from 'react-native';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {}, 600);
  }, []);
  return (
    <ImageBackground source={require('@assets/splash.png')} style={styles.root}>
      <View style={styles.animationContainer}>
        <Image
          source={require('@assets/logo-text.png')}
          style={styles.logoText}
        />
        <View style={styles.partnerContainer}>
          <Typography textAlign="center" fontWeight="bold" color="white">
            Verified by
          </Typography>
          <Image
            style={styles.partnerLogo}
            source={require('@assets/cyberscope.png')}
          />
        </View>
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

export default SplashScreen;
