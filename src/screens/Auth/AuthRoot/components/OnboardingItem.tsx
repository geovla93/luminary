import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
const OnboardingItem = ({item}: any) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width: width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'stretch'}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 1,
  },
});

export default OnboardingItem;
