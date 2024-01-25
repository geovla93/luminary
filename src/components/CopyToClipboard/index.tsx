import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIntl} from 'react-intl';
import {Typography} from '@ui/core/components';

const CopyToClipboard = ({onPress}: any) => {
  const {formatMessage} = useIntl();
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <Icon name="content-copy" size={25} color="#fff" />
      <Typography variant="bodyMedium" sx={{fontWeight: '700', marginLeft: 20}}>
        {formatMessage({id: 'copy_to_clipboard'})}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
});

export default CopyToClipboard;
