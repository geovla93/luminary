import {Typography} from '@ui/core/components';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AiAssistant = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, [fadeAnim]);
  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <LinearGradient
        colors={['#f78d1e', '#00b5b9', '#f78d1e']}
        style={styles.container}>
        <View>
          {/*<LottieView*/}
          {/*  style={styles.lottieIcon}*/}
          {/*  source={require('./ai-icon.json')}*/}
          {/*  autoPlay*/}
          {/*  loop*/}
          {/*/>*/}
        </View>
        <Typography sx={{fontWeight: 'bold'}} variant="titleMedium">
          AI assistant enabled{' '}
        </Typography>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    alignSelf: 'center',

    borderRadius: 20,
  },
  lottieIcon: {width: 60, height: 60},
});

export default AiAssistant;
