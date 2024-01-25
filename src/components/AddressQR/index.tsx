import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';

import QRCode from 'react-native-qrcode-svg';
import {useIntl} from 'react-intl';

type IProps = {
  address: string;
};

const AddressQR = ({address}: IProps) => {
  const {formatMessage} = useIntl();
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
      <Typography sx={styles.address} variant="bodyMedium" textAlign="center">
        {address}
      </Typography>
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
