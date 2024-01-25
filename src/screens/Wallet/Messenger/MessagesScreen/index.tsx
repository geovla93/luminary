import React from 'react';
import {View, SafeAreaView} from 'react-native';

import Chats from '@screens/Wallet/Messenger/MessagesScreen/components/Chats';

const MessengerScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Chats />
      </View>
    </SafeAreaView>
  );
};

export default MessengerScreen;
