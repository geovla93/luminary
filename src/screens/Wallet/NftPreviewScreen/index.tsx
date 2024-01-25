import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import XImage from '@components/Image';
import SquareButton from '@ui/core/components/SquareButton';
import {Button, Typography} from '@ui/core/components';
import {useNavigation} from '@react-navigation/native';
import {colors} from '@ui/core/theme';
import {ScrollView} from 'react-native-virtualized-view';
import NftTabs from '@screens/Wallet/NftPreviewScreen/components/NftTabs';
import {useIntl} from 'react-intl';

const NftPreviewScreen = ({route}: any) => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  const {nft, collection, preview} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <SquareButton onPress={() => navigation.goBack()} />
        <SquareButton onPress={() => console.log('actions')} icon={'more'} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingBottom: 50}}>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <XImage
                source={{uri: nft?.image}}
                style={styles.image}
                progressiveRenderingEnabled={true}
                defaultSource={require('@assets/logo.png')}
              />
            </View>
          </View>
          <View style={styles.heading}>
            <View style={styles.titleContainer}>
              <Typography variant="titleMedium" sx={styles.title}>
                {nft?.name}
              </Typography>
              <Typography
                variant="titleMedium"
                color={colors.primary}
                sx={styles.title}>
                #{nft?.tokenId.toString()}
              </Typography>
            </View>

            <Typography
              variant="bodySmall"
              fontWeight="bold"
              sx={styles.collection}>
              {nft?.legion}
            </Typography>
          </View>
          <View style={styles.metainfoContainer}>
            <View style={styles.detail}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require('@assets/ilumi.png')}
                  style={styles.logo}
                />
              </View>
              <View style={{flexDirection: 'row', flexShrink: 1}}>
                <Typography variant="bodySmall" sx={styles.metaText}>
                  {collection?.name}
                </Typography>
                {nft?.floor && (
                  <Typography variant="bodySmall" sx={styles.metaText}>
                    {formatMessage({id: 'floor_price'})}
                    {nft?.floor}
                  </Typography>
                )}
              </View>
            </View>
            {nft?.rank !== undefined && (
              <View style={styles.detail}>
                <View style={styles.logoWrapper}>
                  <Image
                    source={require('@assets/icon-rank.png')}
                    style={styles.logo}
                  />
                </View>
                <View>
                  <Typography variant="bodySmall" sx={styles.metaText}>
                    {formatMessage({id: 'rarity_rank'})}
                  </Typography>
                  <Typography variant="bodySmall" sx={styles.rank}>
                    #{nft?.rank}
                  </Typography>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={{flex: 1}}>
          <NftTabs nft={nft} />
        </View>
        {!preview && (
          <Button sx={{marginHorizontal: 20}}>
            <Typography variant={'bodyMedium'} color={'#000'}>
              {formatMessage({id: 'send_nft'})}
            </Typography>
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageWrapper: {
    padding: 20,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    shadowColor: 'rgba(236, 194, 72, 1)',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    shadowOpacity: 0.4,
    backgroundColor: 'rgba(34, 31, 26, 1)',
    borderRadius: 15,
  },
  image: {
    flex: 1,
    borderRadius: 15,
    width: '100%',
    height: 360,
  },
  heading: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  metainfoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    borderRadius: 15,
    backgroundColor: '#221F1A',
    padding: 8,
    flexDirection: 'row',
    width: '48%',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    fontWeight: '700',
  },
  collection: {
    color: '#ECE1CF',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoWrapper: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#000',
    marginRight: 10,
  },
  metaText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
  },
  rank: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    fontSize: 16,
    color: colors.primary,
  },
});

export default NftPreviewScreen;
