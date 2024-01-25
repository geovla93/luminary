import ArrowAngleRight from '@ui/core/Icons/ArrowAngleRight';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

const BregAnimationSmall = () => {
  return (
    <ImageBackground
      source={require('../../../../assets/breg/breg.gif')}
      style={styles.root}>
      <View style={styles.overlay}>
        <ArrowAngleRight />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 111,
    width: 50,
    height: 50,
  },
});

export default BregAnimationSmall;
