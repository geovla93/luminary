import React from 'react';
import {IDapp} from '@itypes/dapps';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';

import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

const DappListItem = ({
  item,
  openDapp,
}: {
  item: IDapp;
  openDapp: (dapp: IDapp) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => openDapp(item)} style={styles.root}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
      <View style={styles.description}>
        <View style={styles.item}>
          <Typography
            sx={{marginBottom: 2, color: 'white'}}
            variant="bodySmall"
            fontWeight="bold">
            {item.name}
          </Typography>
          <Typography sx={{fontSize: 12}} variant="bodySmall">
            {item.description}
          </Typography>
        </View>
        <View style={styles.item}>
          <IconButton
            containerColor={colors.primary}
            iconColor={colors.onPrimary}
            onPress={() => openDapp(item)}
            size={20}
            icon={'chevron-right'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  imageContainer: {
    borderRadius: 12,
    height: 40,
    width: 40,
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
