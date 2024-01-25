import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import DetailsSubSection from '@screens/Wallet/NftPreviewScreen/components/Details/components/DetailsSubSection';
// import ScanQrIcon from '@ui/core/Icons/ScanQrIcon';
import ShareIcon from '@ui/core/Icons/ShareIcon';
import {useIntl} from 'react-intl';
import CopyContentIcon from '@ui/core/Icons/CopyContentIcon';

const Details = ({nft}: {nft: any}) => {
  const {formatMessage} = useIntl();
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const shortDescription = showFullDescription
    ? nft?.description
    : nft?.description.length > 200
    ? nft?.description?.slice(0, 200) + '...'
    : nft?.description;
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        flex: 1,
      }}>
      <DetailsSubSection title={'Description'}>
        <>
          <Typography variant={'bodyMedium'} color={'#fff'}>
            {shortDescription}
          </Typography>
          {nft?.description > 200 && (
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}>
              {!showFullDescription ? (
                <Typography variant={'bodySmall'} sx={styles.textLink}>
                  {formatMessage({
                    id: 'read_more',
                    defaultMessage: 'Read more',
                  })}
                </Typography>
              ) : (
                <Typography variant={'bodySmall'} sx={styles.textLink}>
                  {formatMessage({
                    id: 'read_less',
                    defaultMessage: 'Show less',
                  })}
                </Typography>
              )}
            </TouchableOpacity>
          )}
        </>
      </DetailsSubSection>

      {/* <DetailsSubSection title={'Ownership'}>
        <View style={styles.ownerEntry}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.ownerImageWrapper}>
              <Image
                source={require('@assets/ilumi.png')}
                style={styles.ownerImage}
              />
            </View>
            <View>
              <Typography
                variant={'bodyMedium'}
                color={'#fff'}
                sx={styles.ownerName}>
                @vantelo346
              </Typography>
              <Typography variant={'bodySmall'}>Artist</Typography>
            </View>
          </View>
          <View style={styles.badgeButton}>
            <Typography
              variant={'bodySmall'}
              color={colors.primary}
              sx={styles.badgeText}>
              10% Royalties
            </Typography>
          </View>
        </View>
        <View style={[styles.ownerEntry, {marginTop: 10}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.ownerImageWrapper}>
              <Image
                source={require('@assets/ilumi.png')}
                style={styles.ownerImage}
              />
            </View>
            <View>
              <Typography
                variant={'bodyMedium'}
                color={'#fff'}
                sx={styles.ownerName}>
                @iLuminary01
              </Typography>
              <Typography variant={'bodySmall'}>Owner</Typography>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.badgeButton, styles.badgeButtonFilled]}>
            <ScanQrIcon size={20} color={'#000'} style={{marginRight: 10}} />
            <Typography
              variant={'bodySmall'}
              color={colors.onPrimary}
              sx={styles.badgeText}>
              {formatMessage({id: 'scan_qr', defaultMessage: 'Scan QR'})}
            </Typography>
          </TouchableOpacity>
        </View>
      </DetailsSubSection> */}

      <DetailsSubSection title={'Base info'}>
        <View style={styles.infoEntry}>
          <Typography variant={'bodyMedium'} color={'#fff'}>
            Contract address
          </Typography>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Typography variant={'bodyMedium'}>0x3a...a5</Typography>
            <TouchableOpacity style={{marginLeft: 10, marginRight: 5}}>
              <CopyContentIcon size={22} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 5}} onPress={() => {}}>
              <ShareIcon size={22} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoEntry}>
          <Typography variant={'bodyMedium'} color={'#fff'}>
            Token ID
          </Typography>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Typography variant={'bodyMedium'}>#{nft.tokenId}</Typography>
            <TouchableOpacity style={{marginLeft: 10}}>
              <CopyContentIcon size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        {nft?.attributes?.map((attribute: any, index: number) => (
          <View style={styles.infoEntry} key={`nft-attribute-${index}`}>
            <Typography
              variant={'bodyMedium'}
              sx={{textTransform: 'capitalize'}}
              color={'#fff'}>
              {attribute?.trait_type}
            </Typography>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Typography
                variant={'bodyMedium'}
                sx={{textTransform: 'capitalize'}}>
                {attribute?.value}
              </Typography>
            </View>
          </View>
        ))}
      </DetailsSubSection>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  contentSection: {
    width: '100%',
    backgroundColor: '#221F1A',
    marginTop: 5,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  textLink: {fontFamily: 'Roboto-Medium', fontSize: 14, color: colors.primary},
  ownerImageWrapper: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 5,
    padding: 5,
  },
  ownerImage: {
    width: 30,
    height: 30,
    borderRadius: 16,
  },
  badgeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    width: 124,
  },
  ownerName: {fontFamily: 'Roboto-Medium', fontSize: 16, marginBottom: 3},
  badgeText: {fontFamily: 'Roboto-Medium', fontSize: 14},
  ownerEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeButtonFilled: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});
