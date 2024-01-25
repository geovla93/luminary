import React from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
}

const ScreenContainer = ({children}: ContainerProps) => {
  return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: Platform.select({
      ios: 0,
      android: 10,
    }),
  },
});

export default ScreenContainer;
