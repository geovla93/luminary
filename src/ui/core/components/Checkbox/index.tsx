import {colors} from '@ui/core/theme';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CheckboxProps {
  checked: boolean;
  onCheckChange: () => void;
  backgroundColor?: string;
  borderColor?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckChange,
  backgroundColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.checkbox, {backgroundColor, borderColor}]}
      onPress={onCheckChange}
      accessibilityLabel={checked ? 'Checkbox checked' : 'Checkbox unchecked'}>
      {checked && <Icon name="check" size={18} color={colors.primary} />}
    </TouchableOpacity>
  );
};

Checkbox.defaultProps = {
  backgroundColor: '#15130E',
  borderColor: '#15130E',
};

const styles = StyleSheet.create({
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#15130E',
    backgroundColor: '#15130E',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checkbox;
