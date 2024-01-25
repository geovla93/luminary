import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

interface PaperProps {
  children: React.ReactNode;
  sx?: any;
}

const Paper = ({children, sx}: PaperProps) => {
  const theme = useTheme();
  const styles = useStyle(theme.colors);
  return <View style={{...styles.root, ...sx}}>{children}</View>;
};

Paper.defaultProps = {
  sx: {},
};

const useStyle = (colors: MD3Colors) =>
  StyleSheet.create({
    root: {
      backgroundColor: colors.backdrop,
      padding: 10,
      borderRadius: 20,
    },
  });

export default Paper;
