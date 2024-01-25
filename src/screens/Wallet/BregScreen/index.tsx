import React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';
import BregIntro from '@screens/Wallet/BregScreen/components/BregIntro';
import useBreg from '@hooks/useBreg';
import {colors} from '@ui/core/theme';
import BregChat from './components/BregChat';

const BregWidget = ({onClose}: {onClose: () => void}) => {
  const {hideBregSplash, displayBregSplash} = useBreg();

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.root}>
        {displayBregSplash ? (
          <BregIntro onClose={onClose} hideBregSplash={hideBregSplash} />
        ) : (
          <BregChat onClose={onClose} />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    ...StyleSheet.absoluteFillObject,
  },
  chatTitle: {
    fontSize: 32,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
    lineHeight: 40,
  },
  startChatButton: {
    width: 98,
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BregWidget;
