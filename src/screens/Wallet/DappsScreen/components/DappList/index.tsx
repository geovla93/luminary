import {IDapp} from '@itypes/dapps';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DappListItem from '../DappListItem';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

const DappList = ({
  items,
  openDapp,
}: {
  items: IDapp[];
  openDapp: (dapp: IDapp) => void;
}) => {
  const {formatMessage} = useIntl();
  const renderItem = ({item}: {item: IDapp}) => {
    return <DappListItem item={item} openDapp={openDapp} />;
  };

  return (
    <View style={styles.root}>
      <Typography
        variant="bodyLarge"
        fontWeight="bold"
        sx={{color: 'white', fontSize: 22}}>
        {formatMessage({
          id: 'dapps_title',
        })}
      </Typography>
      <FlatList
        data={items}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default DappList;
