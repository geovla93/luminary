import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '@screens/screens';
import ContactsScreen from './ContactsScreen';
import MessengerScreen from './MessagesScreen';

const MessengerStack = createNativeStackNavigator();

const MessengerFlowStack = () => {
  return (
    <MessengerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MessengerStack.Screen
        name={SCREENS.APP_MESSENGER_CONTACTS_SCREEN}
        component={ContactsScreen}
      />
      <MessengerStack.Screen
        name={SCREENS.APP_MESSENGER_SCREEN}
        component={MessengerScreen}
      />
    </MessengerStack.Navigator>
  );
};

export default MessengerFlowStack;
