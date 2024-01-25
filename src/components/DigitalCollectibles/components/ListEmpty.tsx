import React from 'react';
import {Typography} from '@ui/core/components';
import {View} from 'react-native';
import {useIntl} from 'react-intl';

const EmptyListComponent = () => {
  const {formatMessage} = useIntl();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography mt={20} variant="bodyLarge">
        {formatMessage({id: 'empty_collection'})}
      </Typography>
    </View>
  );
};
export default EmptyListComponent;
