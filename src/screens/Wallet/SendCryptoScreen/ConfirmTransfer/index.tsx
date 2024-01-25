import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const ConfirmTransfer = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <Text>ConfirmTransfer</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default ConfirmTransfer;
