import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useToast} from 'react-native-toast-notifications';
import {scale, verticalScale} from 'react-native-size-matters';
import {Button} from '@ui/core/components';

import OnboardingHeader from '@components/OnboardingHeader';
import SecretPhrase from '@components/SecretPhrase';
import CopyToClipboard from '@components/CopyToClipboard';
import {usePinManager} from '@components/PinManagerProvider';
import useWalletFactory from '@hooks/wallet/useWalletFactory';
import {useWalletContext} from '@hooks/useWalletContext';
import HeaderComponent from '@components/HeaderComponent';

interface Props {
  navigation: {
    navigate: (screen: string, options: any) => void;
    goBack: () => void;
  };
}

const RecoveryPhraseBackupScreen = ({navigation}: Props) => {
  const {formatMessage} = useIntl();
  const {getWalletSeedPhrase} = useWalletFactory();
  const {current} = useWalletContext();

  const {lockForPin} = usePinManager();

  const [mnemonic, setMnemonic] = useState<string>('');
  const toast = useToast();

  const onUnlock = async (pin: string) => {
    const phrase = await getWalletSeedPhrase(pin, current);
    if (phrase) {
      setMnemonic(phrase);
    }
  };

  useEffect(() => {
    lockForPin((pin: string) => onUnlock(pin));
  }, []);

  const handleCopy = () => {
    Clipboard.setString(mnemonic);
    toast.hideAll();
    toast.show(formatMessage({id: 'copied_to_clipboard'}), {
      type: 'success',
      placement: 'top',
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <HeaderComponent
        title="your_wallet_recovery_phrase"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <OnboardingHeader subtitle="backup_subtitle" info="backup_notice" />
        <SecretPhrase phrase={mnemonic.split(' ')} />
        <CopyToClipboard onPress={handleCopy} />

        <View style={styles.bottom}>
          <Button textColor="black" sx={{marginTop: 5}}>
            {formatMessage({
              id: 'continue',
            })}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  bottom: {
    flex: 1,
    display: 'none',
    justifyContent: 'flex-end',
  },
  skip: {
    marginTop: verticalScale(5),
  },
});

export default RecoveryPhraseBackupScreen;
