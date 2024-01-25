import {IDapp} from '@itypes/dapps';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

const DappsSectionItem = ({
  item,
  openDapp,
}: {
  item: IDapp;
  openDapp: (dapp: IDapp) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => openDapp(item)}
      style={styles.itemContainer}>
      <Image style={styles.image} source={{uri: item.image}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 68,
    width: 68,
    marginRight: 20,
    backgroundColor: 'rgba(255, 255, 255, .1)',
    padding: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default DappsSectionItem;
