import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {formatAddress} from '@utils/functions';
import Checkbox from '@ui/core/components/Checkbox';

const AddressItem = ({
  data,
  index,
  perPage,
  currentPage,
  selected,
  onSelect,
}: any) => {
  const itemNo = index + 1 + (currentPage - 1) * perPage;
  return (
    <Pressable
      onPress={() => onSelect(data.derivationPath)}
      style={styles.root}>
      <View style={styles.itemNumber}>
        <Checkbox
          checked={selected}
          onCheckChange={() => onSelect(data.derivationPath)}
        />
        <Typography sx={styles.addressIndex}>{itemNo}</Typography>
      </View>
      <View style={styles.itemData}>
        <Typography fontWeight="bold">{formatAddress(data.address)}</Typography>
        <Typography sx={{fontSize: 12}} variant="bodySmall">
          {data.derivationPath}
        </Typography>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1B16',
    padding: 5,
    borderRadius: 10,
  },
  itemNumber: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  addressIndex: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  itemData: {
    flexGrow: 1,
  },
});

export default AddressItem;
