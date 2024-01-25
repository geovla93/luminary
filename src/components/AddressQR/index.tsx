import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import {useIntl} from 'react-intl';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type IProps = {
  address: string;
};

const AddressQR = ({address}: IProps) => {
  const {formatMessage} = useIntl();

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    Clipboard.setString(address);
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
    <View style={styles.root}>
      <Typography sx={styles.text} variant="bodyMedium" textAlign="center">
        {formatMessage({id: 'your_wallet_address'})}
      </Typography>
      <View style={styles.qrContainer}>
        <QRCode
          // enableLinearGradient
          // linearGradient={[theme.colors.primary, theme.colors.tertiary]}
          value={address}
          logo={require('@assets/logo.png')}
          logoSize={40}
          ecl="H"
          logoBackgroundColor="white"
          logoBorderRadius={10}
          size={200}
        />
      </View>
      <TouchableOpacity onPress={() => handleCopy()} style={{marginTop: 20}}>
        <Typography sx={styles.address} variant="bodyMedium" textAlign="center">
          {copied ? (
            formatMessage({id: 'copied'})
          ) : (
            <>
              {address} <Icon name="content-copy" size={15} color="#fff" />
            </>
          )}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#221F1A',
    borderRadius: 20,
    marginTop: 20,
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  qrContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  address: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AddressQR;
