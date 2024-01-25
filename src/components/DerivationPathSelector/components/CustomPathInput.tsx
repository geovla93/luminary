import {Typography} from '@ui/core/components';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DPInput from './DPInput';

interface IProps {
  onChange: (value: string) => void;
}

const CustomPathInput = ({onChange}: IProps) => {
  const [first, setFirst] = useState<string>('0');
  const [second, setSecond] = useState<string>('0');
  const [last, setLast] = useState<string>('n');

  useEffect(() => {
    onChange(`m/44'/60'/${first}'/${second}/${last}`);
  }, []);

  const handleChangeFirst = useCallback(
    (value: string) => {
      if (value === '') {
        setFirst('0');
        onChange(`m/44'/60'/0'/${second}/${last}`);
        return;
      } else if (value.startsWith('0')) {
        setFirst(value.replace('0', ''));
        onChange(`m/44'/60'/${value.replace('0', '')}'/${second}/${last}`);
        return;
      }
      setFirst(value);
      onChange(`m/44'/60'/${value}'/${second}/${last}`);
    },
    [second, last],
  );

  const handleChangeSecond = useCallback(
    (value: string) => {
      if (value === '') {
        setSecond('0');
        onChange(`m/44'/60'/${first}'/0/${last}`);
        return;
      } else if (value.startsWith('0')) {
        setSecond(value.replace('0', ''));
        onChange(`m/44'/60'/${first}'/${value.replace('0', '')}/${last}`);
        return;
      }
      setSecond(value);
      onChange(`m/44'/60'/${first}'/${value}/${last}`);
    },
    [first, last],
  );

  const handleChangeLast = useCallback(
    (value: string) => {
      if (value === '') {
        setLast('n');
        onChange(`m/44'/60'/${first}'/${second}/n`);
        return;
      } else if (value.includes('n') && value.length > 1) {
        setLast(value.replace('n', ''));
        onChange(`m/44'/60'/${first}'/${second}/${value.replace('n', '')}`);
        return;
      }
      setLast(value);
      onChange(`m/44'/60'/${first}'/${second}/${value}`);
    },
    [first, second],
  );

  return (
    <View style={styles.root}>
      <Typography variant="bodySmall">m/44'/60'/</Typography>
      <DPInput value={first} onChange={handleChangeFirst} />
      <Typography variant="bodySmall">'/</Typography>
      <DPInput value={second} onChange={handleChangeSecond} />
      <Typography variant="bodySmall">/</Typography>
      <DPInput value={last} onChange={handleChangeLast} />
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

export default CustomPathInput;
