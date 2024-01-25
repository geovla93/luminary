import TextField from '@ui/core/components/TextField';
import {colors} from '@ui/core/theme';
import React from 'react';
import {StyleSheet} from 'react-native';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}
const DPInput = ({value, onChange}: IProps) => {
  return (
    <TextField
      value={value}
      onChangeText={onChange}
      style={styles.input}
      placeholder="n"
      placeholderTextColor="#ffffff"
      keyboardType="numeric"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#ffffff',
    backgroundColor: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 3,
    width: 30,
    height: 30,
  },
});

export default DPInput;
