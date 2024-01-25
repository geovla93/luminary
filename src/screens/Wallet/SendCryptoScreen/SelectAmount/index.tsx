import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@ui/core/components';

import {useCreateTransaction} from '@hooks/useCreateTransaction';
import TokenPicker from '@components/TokenSelector/TokenPicker';
import BottomSheet from '@gorhom/bottom-sheet';
import {SCREENS} from '@screens/screens';
import HeaderComponent from '@components/HeaderComponent';
import TokenSelector from '@components/TokenSelector';

import AssetAmountInfo from '@components/AssetAmountInfo';
import {IToken} from '@itypes/token';
import AmountSet from '@components/AmmountSet';

const SelectAmount = () => {
  const navigation = useNavigation<any>();
  const {token, tokens, setToken, setAmount} = useCreateTransaction();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tokenPickerOpen, setTokenPickerOpen] = useState(false);
  const {formatMessage} = useIntl();

  const onTokenSelect = (_token: IToken) => {
    setToken(_token);
    handleTokenPickerClose();
  };

  const handleTokenPickerClose = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setTokenPickerOpen(false);
    }, 100);
  };

  const onSelectMax = () => {
    setAmount(Number(token.balance));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <HeaderComponent
          onBack={() => navigation.goBack()}
          title="select_amount"
          onClose={() => navigation.navigate(SCREENS.APP_HOME_SCREEN)}
        />

        <View style={styles.container}>
          <View style={styles.selector}>
            <TokenSelector
              token={token}
              onPress={() => {
                setTokenPickerOpen(true);
                bottomSheetRef.current?.expand();
              }}
            />
            <AssetAmountInfo token={token} onSelectMax={() => onSelectMax()} />
          </View>
          <View style={styles.amountSelectorContainer}>
            <AmountSet />
          </View>
        </View>
        <View>
          <Button
            sx={{margin: 20}}
            size="medium"
            variant="contained"
            onPress={() => navigation.navigate(SCREENS.APP_SEND_SELECT_AMOUNT)}>
            {formatMessage({id: 'next'})}
          </Button>
        </View>
      </View>
      {tokenPickerOpen && (
        <TokenPicker
          tokens={tokens}
          bottomSheetRef={bottomSheetRef}
          onPress={onTokenSelect}
          onClose={handleTokenPickerClose}
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
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  amountSelectorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#221F1A',
  },
});

export default SelectAmount;
