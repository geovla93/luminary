import {useCreateTransaction} from '@hooks/useCreateTransaction';
import {Typography} from '@ui/core/components';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const AmountSet = () => {
  const {token} = useCreateTransaction();
  return (
    <View style={styles.root}>
      <View style={styles.amount}>
        <TextInput placeholder="0.00" value="0.00" keyboardType="numeric" />
        <Typography variant="displaySmall">
          {token.symbol.toUpperCase()}
        </Typography>
      </View>
      <Typography>0.100</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
});

export default AmountSet;
