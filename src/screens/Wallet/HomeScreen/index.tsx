import React from 'react';
import Header from '../../../components/Header';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import WalletTabs from './components/WalletTabs';
import {colors} from '@ui/core/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
        marginTop: Platform.select({
          ios: 0,
          android: 10,
        }),
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : undefined}
        style={{flex: 1}}>
        <Header />
        <WalletTabs />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
