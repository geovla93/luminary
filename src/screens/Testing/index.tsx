import React, {useEffect} from 'react';
import {Button, Typography} from '@ui/core/components';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useWalletContext} from '@hooks/useWalletContext';
import useCreateWallet from '@hooks/wallet/useCreateWallet';

const Testing = () => {
  const {wallet, backupWallet, extractWalletCredentials} = useWalletContext();
  const {createWallet} = useCreateWallet();
  useEffect(() => {}, [wallet]);

  const handleCopy = async () => {
    const res = await extractWalletCredentials();
    console.log('handleCopy', res);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Typography sx={{marginBottom: 20}} variant="headlineSmall">
          Testing
        </Typography>
        <Button onPress={() => createWallet()}>Create Wallet</Button>
        <Button sx={{marginTop: 20}} onPress={handleCopy}>
          Extract Wallet
        </Button>
        <Button sx={{marginTop: 20}} onPress={() => backupWallet('Testing')}>
          BackupWallet
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});

export default Testing;
