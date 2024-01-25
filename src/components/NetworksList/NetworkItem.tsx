import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import Clipboard from '@react-native-clipboard/clipboard';
import {colors} from '@ui/core/theme';
import SecondaryButton from '@ui/core/components/SecondaryButton';
import {useToast} from 'react-native-toast-notifications';
import {useIntl} from 'react-intl';
import {formatAddress} from '@utils/functions';

const NetworkItem = ({
  item,
  address,
  index,
  selected = false,
  onPress,
}: any) => {
  const toast = useToast();
  const {formatMessage} = useIntl();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    Clipboard.setString(address);
    toast.hideAll();
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected && styles.selected]}
      onPress={onPress}
      key={index}>
      <View style={styles.itemName}>
        <Image source={item.image} style={styles.networkIcon} />
        <View style={styles.nameWrapper}>
          <Typography variant="titleMedium" sx={styles.name}>
            {item.name}
          </Typography>
          <Typography sx={styles.networkAddress}>
            {formatAddress(address)}
          </Typography>
        </View>
      </View>
      {selected && (
        <SecondaryButton action={handleCopy} icon={'content-copy'}>
          {formatMessage({id: copied ? 'copied' : 'copy'})}
        </SecondaryButton>
      )}
    </TouchableOpacity>
  );
};

export default NetworkItem;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: colors.tertiary,
  },
  itemContainer: {
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  nameWrapper: {
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  name: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 16,
  },
  networkAddress: {
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
    opacity: 0.6,
    marginTop: 3,
    fontSize: 14,
  },
  networkIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});
