import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';

const HelpScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <View style={styles.header}>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View />
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
