import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useToast} from 'react-native-toast-notifications';
import {scale, verticalScale} from 'react-native-size-matters';
import {Button} from '@ui/core/components';
import {SCREENS} from '@screens/screens';
import SecretPhrase from '../../../components/SecretPhrase';
import OnboardingHeader from '../../../components/OnboardingHeader';
import CopyToClipboard from '../../../components/CopyToClipboard';
import OnboardingSteps from '../../../components/OnboardingSteps';
import {useTemporaryWallet} from '@hooks/useTemporaryWallet';

const BackupWalletScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const {getSeedPhrase} = useTemporaryWallet();
  const [mnemonic, setMnemonic] = useState<string>('');
  const toast = useToast();

  useEffect(() => {
    const setMnemonicPhrase = async () => {
      const phrase = getSeedPhrase();
      if (phrase) {
        setMnemonic(phrase);
      }
    };

    setMnemonicPhrase();
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
      <View style={styles.content}>
        <OnboardingSteps total={4} fill={1} />
        <ScrollView>
          <OnboardingHeader
            title={'add_seed_phrase'}
            subtitle="backup_subtitle"
            info="backup_notice"
          />
          <SecretPhrase phrase={mnemonic.split(' ')} />
          <CopyToClipboard onPress={handleCopy} />
        </ScrollView>
        <View style={styles.bottom}>
          <Button
            // variant="elevated"
            textColor="black"
            onPress={() => navigation.navigate(SCREENS.VERIFY_BACKUP_SCREEN)}
            sx={{marginTop: 5}}>
            {formatMessage({
              id: 'backup_manually',
            })}
          </Button>
          <Button size="small" sx={styles.skip} textColor="red" variant="text">
            {formatMessage({
              id: 'backup_later',
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
    paddingHorizontal: scale(15),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  skip: {
    marginTop: verticalScale(5),
  },
});

export default BackupWalletScreen;
