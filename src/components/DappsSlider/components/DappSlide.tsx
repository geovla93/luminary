import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {openLink} from '@utils/inAppBrowser';
import {IDapp} from '@itypes/dapps';

const DappSlide = ({item}: {item: IDapp}) => {
  return (
    <TouchableOpacity onPress={() => openLink(item.url)}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: item.featuredImage ?? item.image}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DappSlide;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 20,
  },

  imageContainer: {
    borderRadius: 15,
    height: 165,
    width: Dimensions.get('window').width - 40,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});
