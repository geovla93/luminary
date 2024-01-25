import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Typography} from '@ui/core/components';
import SquareButton from '@ui/core/components/SquareButton';

const HandleComponent = ({title, onClose}: any) => {
  return (
    <View style={styles.arrowContainer}>
      <View />
      <Typography textAlign="center" fontWeight="bold" variant="titleMedium">
        {title}
      </Typography>
      <View style={styles.actions}>
        <SquareButton icon="close" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  actions: {},
});

export default HandleComponent;
