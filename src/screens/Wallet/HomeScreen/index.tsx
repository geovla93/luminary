import React from 'react';
import Header from '../../../components/Header';
import {SafeAreaView} from 'react-native';
import WalletTabs from './components/WalletTabs';
import {colors} from '@ui/core/theme';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
      }}>
      <Header />
      <WalletTabs />
    </SafeAreaView>
  );
};

export default HomeScreen;
