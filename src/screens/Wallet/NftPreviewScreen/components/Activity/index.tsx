import React from 'react';
import {View} from 'react-native';
import {Typography} from '@ui/core/components';

const Activity = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Typography textAlign="center" variant={'bodyLarge'}>
        No activity yet
      </Typography>
    </View>
  );
};

export default Activity;
