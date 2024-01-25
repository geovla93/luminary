import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmTransfer from './ConfirmTransfer';
import SelectTo from './SelectTo';
import {SCREENS} from '@screens/screens';
import SelectAmount from './SelectAmount';
import TransferStatus from './TransferStatus';
import CreateTransactionProvider from '@hooks/useCreateTransaction';

const SendCryptoStack = createNativeStackNavigator();

const SendCryptoScreen = () => {
  return (
    <CreateTransactionProvider>
      <SendCryptoStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <SendCryptoStack.Screen
          name={SCREENS.APP_SEND_SELECT_TO}
          component={SelectTo}
        />
        <SendCryptoStack.Screen
          name={SCREENS.APP_SEND_SELECT_AMOUNT}
          component={SelectAmount}
        />
        <SendCryptoStack.Screen
          name={SCREENS.APP_SEND_CONFIRMATION}
          component={ConfirmTransfer}
        />
        <SendCryptoStack.Screen
          name={SCREENS.APP_SEND_SUCCESS}
          component={TransferStatus}
        />
      </SendCryptoStack.Navigator>
    </CreateTransactionProvider>
  );
};

export default SendCryptoScreen;
