import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {ScrollView} from 'react-native';

const NFTS = [
  {
    name: 'Acria',
    image: 'https://iluminary.ai/wp-content/uploads/2023/06/luminary.jpg',
  },
  {
    name: 'Ofero',
    image: 'https://iluminary.ai/wp-content/uploads/2023/06/IMG_0746.jpeg',
  },
  {
    name: 'MATIC',
    image:
      'https://iluminary.ai/wp-content/uploads/2023/06/creative_conclave.jpg',
  },
  {
    name: 'Acria',
    image:
      'https://iluminary.ai/wp-content/uploads/2023/06/photo_2023-06-26_16-08-09.jpg',
  },
];
const NftSlider = ({title}: any) => {
  return (
    <View style={styles.container}>
      <Typography sx={{fontWeight: 'bold'}} variant="titleMedium">
        {title}
      </Typography>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.content}>
        {NFTS.map((nft, index) => (
          <TouchableOpacity
            onPress={() => console.log('NFG')}
            key={`nft-${index}`}
            style={styles.item}>
            <Image style={styles.itemImage} source={{uri: nft.image}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

NftSlider.defaultProps = {
  title: 'Digital Collectibles',
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#101728',
    borderRadius: 20,
  },
  content: {
    marginVertical: 10,
  },
  item: {},
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default NftSlider;
