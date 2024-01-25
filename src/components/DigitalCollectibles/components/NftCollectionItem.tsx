import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import PreloadImage from '@components/Image';
import {Typography} from '@ui/core/components';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '@screens/screens';
import {useIntl} from 'react-intl';

const NftCollectionItem = ({collection}: any) => {
  const {formatMessage} = useIntl();
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.item, styles.shadow]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREENS.APP_NFT_COLLECTION_SCREEN, {
            collection,
          })
        }>
        <PreloadImage
          style={styles.itemImage}
          source={{uri: collection.image}}
        />
        <Image source={require('@assets/hot.png')} style={styles.hot} />
        <View style={{padding: 8}}>
          <Typography sx={styles.collectionName} variant="titleSmall">
            {collection.name}
          </Typography>
          <Typography sx={styles.supplyText} variant="bodySmall">
            {formatMessage(
              {id: 'total_supply'},
              {value: collection.total_supply},
            )}
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
  hot: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  collectionName: {
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  supplyText: {
    fontWeight: '300',
    fontSize: 12,
    color: 'rgba(236, 225, 207, 1)',
    fontFamily: 'Roboto-Medium',
  },
});

export default NftCollectionItem;
