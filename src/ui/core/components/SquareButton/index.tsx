import React from 'react';
import {IconButton, MD3Theme, useTheme} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '@ui/core/theme';

const SquareButton = ({
  onPress,
  icon = 'arrow-left',
  iconColor = colors.primary,
}: {
  onPress: () => void;
  icon?: string;
  iconColor?: string;
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <IconButton
        iconColor={iconColor}
        icon={icon}
        size={22}
        style={{margin: 0, padding: 0}}
      />
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
    },
  });

export default SquareButton;
