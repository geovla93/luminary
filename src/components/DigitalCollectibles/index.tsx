import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {ScrollView} from 'react-native';
import {useTheme, MD3Theme, Chip} from 'react-native-paper';

const NFTS = [
  {
    rank: 12,
    name: 'iLuminary #124',
    collection: 'Luminary Legion',
    image:
      'https://i.nfte.ai/ia/l201/2114295/4006134466610048061_1497195170.avif',
  },
  {
    rank: 13,
    name: 'iLuminary #325',
    collection: 'Harmonious Horde',
    image:
      'https://i.nfte.ai/ia/l201/2114295/4006134466662062493_1289259021.avif',
  },
  {
    rank: 134,
    name: 'iLuminary #235',
    collection: 'The Creative Conclave',
    image:
      'https://i.nfte.ai/ia/l201/2114295/4006134466615410061_2136820856.avif',
  },
  {
    rank: 1315,
    name: 'iLuminary #156',
    collection: 'The Compassionate',
    image:
      'https://i.nfte.ai/ia/l201/2114295/4006134466416695709_1577202549.avif',
  },
];
const DigitalCollectibles = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {NFTS.map((nft, index) => (
            <View style={[styles.item, styles.fakeShadow]} key={`nft-${index}`}>
              <TouchableOpacity
                style={styles.shadow}
                onPress={() => console.log('NFG')}>
                <Image style={styles.itemImage} source={{uri: nft.image}} />
                <Chip textStyle={styles.chipText} style={styles.chip}>
                  #{nft.rank}
                </Chip>
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
                      fontSize: 12,
                      color: 'rgba(236, 225, 207, 1)',
                      fontFamily: 'Roboto-Medium',
                    }}
                    variant="bodySmall">
                    {nft.collection}
                  </Typography>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      // marginVertical: 20,
      marginTop: 10,
      padding: 3,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      marginVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    item: {
      borderRadius: 10,
      marginVertical: 5,
      padding: 0,
      position: 'relative',
      backgroundColor: 'rgba(34, 31, 26, 1)',
      width: '48%',
    },
    shadow: {
      elevation: 2,
      shadowColor: 'rgba(236, 194, 72, 0.12)',
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 5,
      shadowOpacity: 0.6,
    },
    fakeShadow: {
      elevation: 2,
      shadowColor: 'rgba(247, 230, 150, 1)',
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 1,
      shadowOpacity: 0.12,
    },
    itemImage: {
      width: '100%',
      height: 170,
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

export default DigitalCollectibles;
