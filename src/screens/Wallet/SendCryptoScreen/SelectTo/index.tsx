import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {Button} from '@ui/core/components';
import ChainSelector from '@components/ChainSelector';
import SearchWallet from '../../SearchWallet';

import RecentTransactions from '@components/RecentTransactions';
import {useCreateTransaction} from '@hooks/useCreateTransaction';
import ChainPicker from '@components/ChainSelector/ChainPicker';
import BottomSheet from '@gorhom/bottom-sheet';
import {IBlockchain} from '@itypes/blockchain';
import {SCREENS} from '@screens/screens';
import HeaderComponent from '@components/HeaderComponent';
import {useWalletContext} from '@hooks/useWalletContext';

const SelectTo = ({navigation, route}: any) => {
  const token = route.params?.token;
  const {chain, setChain} = useCreateTransaction();
  const [address, setAddress] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [chainPickerOpen, setChainPickerOpen] = useState(false);
  const {chains} = useWalletContext();
  const {formatMessage} = useIntl();

  const onChainSwitch = (_chain: IBlockchain) => {
    setChain(_chain);
    handleChainPickerClose();
  };
  useEffect(() => {
    if (token) {
      const _chain = chains.find(
        (_c: IBlockchain) => _c.shortName === token?.chainId,
      );
      if (_chain) {
        onChainSwitch(_chain);
      }
    }
  }, [token]);

  const handleChainPickerClose = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setChainPickerOpen(false);
    }, 100);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <HeaderComponent
          onBack={() => navigation.goBack()}
          title="send_crypto"
        />
        <View style={styles.container}>
          <ChainSelector
            chain={chain}
            onPress={() => setChainPickerOpen(true)}
          />
          <SearchWallet
            onAddressChange={(value: string) => setAddress(value)}
            address={address}
          />
          <RecentTransactions />
        </View>
        <View>
          <Button
            sx={{margin: 20}}
            size="medium"
            disabled={true}
            variant="contained"
            onPress={() => navigation.navigate(SCREENS.APP_SEND_SELECT_AMOUNT)}>
            {formatMessage({id: 'next'})}
          </Button>
        </View>
      </View>
      {chainPickerOpen && (
        <ChainPicker
          bottomSheetRef={bottomSheetRef}
          onPress={onChainSwitch}
          onClose={handleChainPickerClose}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default SelectTo;
