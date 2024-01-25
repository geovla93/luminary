import {IDapp} from '@itypes/dapps';
import {Button, Typography} from '@ui/core/components';
import React from 'react';
import {useIntl} from 'react-intl';
import {View, StyleSheet, Image} from 'react-native';

const DappListItem = ({
  item,
  openDapp,
}: {
  item: IDapp;
  openDapp: (dapp: IDapp) => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
      <View style={styles.description}>
        <View style={styles.item}>
          <Typography
            sx={{marginBottom: 2, color: 'white'}}
            variant="bodyMedium"
            fontWeight="bold">
            {item.name}
          </Typography>
          <Typography sx={{fontSize: 12}} variant="bodySmall">
            {item.description}
          </Typography>
          <Typography variant="bodySmall">{item.rating} ☆</Typography>
        </View>
        <View style={styles.item}>
          <Button
            size="small"
            variant="contained"
            onPress={() => openDapp(item)}>
            {formatMessage({id: 'open_dapp'})}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageContainer: {
    borderRadius: 12,
    height: 64,
    width: 64,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default DappListItem;
