import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Image from '@components/Image';
import {Typography} from '@ui/core/components';

// import {Chip} from 'react-native-paper';

const NftItem = ({nft, onPress}: any) => {
  return (
    <View style={[styles.item, styles.shadow]}>
      <TouchableOpacity onPress={() => onPress()}>
        <Image style={styles.itemImage} source={{uri: nft.image}} />
        {/* <Chip textStyle={styles.chipText} style={styles.chip}>
          #{collection.rank}
        </Chip> */}
        <View style={{padding: 8}}>
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: 14,
              fontFamily: 'Roboto-Medium',
            }}
            variant="titleSmall">
            {nft.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: '300',
              fontSize: 10,
              color: 'rgba(236, 225, 207, 1)',
              fontFamily: 'Roboto-Medium',
            }}
            variant="bodySmall">
            {nft.legion}
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 0,
    backgroundColor: 'rgba(34, 31, 26, 1)',
    width: '48%',
  },
  shadow: {
    elevation: 2,
    marginHorizontal: 3,
    shadowColor: 'rgba(236, 194, 72, 1)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.3,
    backgroundColor: 'rgba(34, 31, 26, 1)',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    objectFit: 'cover',
  },
  chip: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 40,
    padding: 0,
    margin: 0,
    height: 25,
    backgroundColor: 'rgba(236, 194, 72, 1)',
  },
  chipText: {
    fontSize: 10,
    fontFamily: 'Roboto-Medium',
    lineHeight: 12,
    margin: 0,
    padding: 0,
  },
});

export default NftItem;
