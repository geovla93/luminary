import {
  ImageBackground,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {Typography} from '@ui/core/components';
import React from 'react';

const LearnSlide = ({item}: {item: any}) => {
  const {styles} = useStyles();

  return (
    <View style={styles.itemContainer}>
      <ImageBackground source={{uri: item.image}} style={styles.imageContainer}>
        <View style={styles.textContainer}>
          <View>
            <Typography variant={'titleLarge'} sx={styles.title}>
              {item.title}
            </Typography>
            <Typography variant={'bodySmall'} sx={styles.description}>
              {item?.description?.slice(0, 40)}
            </Typography>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LearnSlide;

const useStyles = () => {
  const {width} = useWindowDimensions();
  const styles = StyleSheet.create({
    itemContainer: {
      borderRadius: 15,
      overflow: 'hidden',
      marginRight: 0,
      marginLeft: 0,
      height: 250,
      width: width - 40,
    },

    imageContainer: {
      width: '100%',
      height: 260,
    },
    textContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      justifyContent: 'space-between',
      marginTop: 120,
    },
    title: {
      fontSize: 26,
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'Roboto-Medium',
      fontWeight: '500',
    },
    description: {
      fontSize: 16,
      color: 'rgba(204, 198, 189, 1)',
      fontFamily: 'Roboto-Medium',
    },
  });

  return {styles};
};
