import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {useNavigation} from '@react-navigation/native';
import {Button, Typography} from '@ui/core/components';
import SquareButton from 'src/ui/core/components/SquareButton';
import ChainSelector from '@components/ChainSelector';
import SearchWallet from '../SearchWallet';

import RecentTransactions from '@components/RecentTransactions';
import CreateTransactionProvider, {
  useCreateTransaction,
} from '@hooks/useCreateTransaction';
import ChainPicker from '@components/ChainSelector/ChainPicker';
import BottomSheet from '@gorhom/bottom-sheet';
import {IBlockchain} from '@itypes/blockchain';

const SendCryptoScreen = () => {
  const navigation = useNavigation<any>();
  const {chain, setChain} = useCreateTransaction();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [chainPickerOpen, setChainPickerOpen] = useState(false);
  const {formatMessage} = useIntl();

  const onChainSwitch = (_chain: IBlockchain) => {
    setChain(_chain);
    handleChainPickerClose();
  };

  const handleChainPickerClose = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setChainPickerOpen(false);
    }, 100);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <View style={styles.header}>
          <SquareButton onPress={() => navigation.goBack()} />
          <Typography
            sx={{marginLeft: 20}}
            fontWeight="bold"
            variant="titleMedium">
            {formatMessage({id: 'send_crypto'})}
          </Typography>
        </View>
        <View style={styles.container}>
          <ChainSelector
            chain={chain}
            onPress={() => setChainPickerOpen(true)}
          />
          <SearchWallet />
          <RecentTransactions />
        </View>
        <View>
          <Button sx={{margin: 20}} variant="contained" onPress={() => {}}>
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

const WrappedSendCryptoScreen = () => {
  return (
    <CreateTransactionProvider>
      <SendCryptoScreen />
    </CreateTransactionProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default WrappedSendCryptoScreen;
