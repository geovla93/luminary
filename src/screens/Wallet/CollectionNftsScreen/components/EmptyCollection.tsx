import {Button, Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {openLink} from '@utils/inAppBrowser';
import React from 'react';
import {useIntl} from 'react-intl';
import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmptyCollection = ({
  onViewCollection,
}: {
  onViewCollection: () => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={require('@assets/empty-collection.png')}
      />
      <Typography textAlign="center" variant="titleLarge">
        {formatMessage({id: 'nft_empty_collection'})}
      </Typography>
      <Typography mt={10} textAlign="center" variant="titleSmall">
        {formatMessage({id: 'nft_empty_collection_description'})}
      </Typography>
      <View style={styles.actionsContainer}>
        <Button
          textColor={colors.primary}
          sx={styles.button}
          onPress={() => onViewCollection()}>
          <Icon name="eye" size={20} color={colors.primary} /> {'  '}
          {formatMessage({id: 'view_collection'})}
        </Button>
        <Button
          disabled
          sx={{marginTop: 10}}
          onPress={() => openLink('https://opensea.io/assets/matic/')}>
          <Icon name="shopping-cart" size={20} color={colors.onPrimary} />{' '}
          {'  '}
          {formatMessage({id: 'buy_nfts'})}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
  image: {
    objectFit: 'contain',
  },
  actionsContainer: {
    marginTop: 30,
    width: '100%',
  },

  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default EmptyCollection;
