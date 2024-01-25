import React from 'react';
import {MD3Theme, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';

const SvgIconBtn = ({onPress, icon, style}: any) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, style]}>
      {icon}
    </TouchableOpacity>
  );
};

const useStyles = (_theme: MD3Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: 'rgba(45, 42, 36, 1)',
      shadowColor: '#000',
      borderRadius: 12,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 2,
      shadowOpacity: 0.3,
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default SvgIconBtn;
