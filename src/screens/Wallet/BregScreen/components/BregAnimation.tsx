import React from 'react';
import {Image, StyleSheet, ImageBackground, Dimensions} from 'react-native';

const BregAnimation = () => {
  const bregWidth = Dimensions.get('window').width * 0.8;
  return (
    <ImageBackground
      resizeMode="contain"
      style={styles.root}
      source={require('../../../../assets/breg/xdots.png')}>
      <Image
        source={require('../../../../assets/breg/breg.gif')}
        style={{width: bregWidth, height: bregWidth, opacity: 0.8}}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BregAnimation;
