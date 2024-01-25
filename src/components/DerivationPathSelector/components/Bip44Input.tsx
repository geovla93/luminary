import {Typography} from '@ui/core/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import DPInput from './DPInput';

interface IProps {
  onChange: (value: string) => void;
}

const Bip44Input = ({onChange}: IProps) => {
  const [customIndex, setCustomIndex] = useState<string>('n');

  const handlePathChange = (value: string) => {
    if (value === '') {
      setCustomIndex('n');
      onChange("m/44'/60'/0'/0/n");
      return;
    } else if (value.includes('n') && value.length > 1) {
      setCustomIndex(value.replace('n', ''));
      onChange(`m/44'/60'/0'/0/${value.replace('n', '')}`);
      return;
    }
    setCustomIndex(value);
    onChange(`m/44'/60'/0'/0/${value}`);
  };

  return (
    <View style={styles.root}>
      <Typography variant="bodySmall">m/44'/60'/0'/0/</Typography>
      <DPInput value={customIndex} onChange={handlePathChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Bip44Input;
