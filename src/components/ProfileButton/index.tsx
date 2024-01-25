import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import React from 'react';

export const ProfileButton = ({
  action,
  text,
  children,
}: {
  action: () => void;
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={[styles.action]}>
      <TouchableOpacity style={styles.button} onPress={action}>
        <View>
          <View style={[styles.actionIcon, styles.shadow]}>{children}</View>
        </View>
        <Typography sx={styles.text} variant="bodyMedium">
          {text}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  action: {
    width: '25%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(236, 194, 72, 1)',
    fontFamily: 'Roboto',
  },
  actionIcon: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'rgba(34, 31, 26, 1)',
  },
  shadow: {
    elevation: 2,
    shadowColor: 'rgba(236, 194, 72, 1)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.3,
    backgroundColor: 'rgba(34, 31, 26, 1)',
  },
});
