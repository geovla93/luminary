import {Typography} from '@ui/core/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';

const SelectWallet = () => {
  const [page, setPage] = useState(0);
  return (
    <View>
      <Typography>Page {page}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SelectWallet;
