import {StyleSheet, View} from 'react-native';
import React from 'react';
import EmptyStateFinancialIcon from '@ui/core/Icons/EmptyStateFinancialIcon';
import {Typography} from '@ui/core/components';

const EmptyState = ({
  title,
  description = '',
}: {
  title: string;
  description?: string;
}) => {
  return (
    <View style={styles.root}>
      <EmptyStateFinancialIcon />
      <Typography
        variant="titleMedium"
        sx={{fontFamily: 'Roboto-Medium', fontSize: 28}}>
        {title}
      </Typography>
      <Typography
        variant="bodyMedium"
        sx={{fontFamily: 'Roboto-Regular', fontSize: 16}}>
        {description}
      </Typography>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
});
