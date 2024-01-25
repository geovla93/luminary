import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InformationBox = ({content}: {content: string}) => {
  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name="information-outline"
          size={40}
          color={colors.primary}
        />
      </View>
      <View style={styles.infoContainer}>
        <Typography variant="bodySmall">{content}</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 20,
    backgroundColor: '#1E1B18',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
});

export default InformationBox;
