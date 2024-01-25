import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingAnimation: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 30,
  },
});

export default LoadingAnimation;
