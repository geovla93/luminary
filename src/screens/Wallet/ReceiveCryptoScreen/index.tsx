import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Share} from 'react-native';
import {useIntl} from 'react-intl';
import {useNavigation} from '@react-navigation/native';
import {Button, Typography} from '@ui/core/components';
import SquareButton from 'src/ui/core/components/SquareButton';
import ChainSelector from '@components/ChainSelector';
import AddressQR from '@components/AddressQR';
import {useWalletContext} from '@hooks/useWalletContext';
import BottomSheet from '@gorhom/bottom-sheet';
import ChainPicker from '@components/ChainSelector/ChainPicker';
import {IBlockchain} from '@itypes/blockchain';

const ReceiveCryptoScreen = () => {
  const navigation = useNavigation<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [chainPickerOpen, setChainPickerOpen] = useState(false);
  const {formatMessage} = useIntl();
  const {chains} = useWalletContext();
  const [chain, setChain] = useState(chains[0]);

  const handleChainPickerClose = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setChainPickerOpen(false);
    }, 100);
  };

  const onChainSwitch = (_chain: IBlockchain) => {
    setChain(_chain);
    handleChainPickerClose();
  };

  const handleShare = () => {
    Share.share({
      title: formatMessage({id: 'share_address_title'}),
      message: formatMessage(
        {id: 'share_address_message'},
        {
          address: chain.address,
          chain: chain.name,
        },
      ),
    });
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
            {formatMessage({id: 'receive_crypto'})}
          </Typography>
        </View>
        <View style={styles.container}>
          <ChainSelector
            chain={chain}
            onPress={() => setChainPickerOpen(true)}
          />
          <AddressQR address={chain.address as string} />
        </View>
        <View>
          <Button
            icon="share"
            sx={{margin: 20}}
            variant="contained"
            onPress={handleShare}>
            {formatMessage({id: 'share_address'})}
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

export default ReceiveCryptoScreen;
