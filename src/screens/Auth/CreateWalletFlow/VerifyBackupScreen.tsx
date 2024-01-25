import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {Button} from '@ui/core/components';

import OnboardingHeader from '../../../components/OnboardingHeader';

import OnboardingSteps from '../../../components/OnboardingSteps';
import VerifySecretPhrase from '@components/VerifySecretPhrase';
import {randomNumbers} from '@utils/functions';
import ConfirmBackup from '@components/ConfirmBackup';
import {SCREENS} from '@screens/screens';
import {useTemporaryWallet} from '@hooks/wallet/useTemporaryWallet';

const VerifyBackupScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const {getSeedPhrase, onConfirmBackup} = useTemporaryWallet();
  const [mnemonic, setMnemonic] = useState<string>('');
  const [selected, setSelected] = useState<any[]>(['', '', '']);
  const [selectedWords, setSelectedWords] = useState<number[] | null>(null);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const setMnemonicPhrase = async () => {
      const phrase = getSeedPhrase();
      if (phrase) {
        setMnemonic(phrase);
        const randomWordsIndex = randomNumbers(12);
        setSelectedWords(randomWordsIndex);
      } else {
        navigation.goBack();
      }
    };

    setMnemonicPhrase();
  }, []);

  const onConfirm = () => {
    onConfirmBackup();
    setVisible(false);
    navigation.navigate(SCREENS.SECURE_CREATED_SCREEN);
  };

  const validate = () => {
    return showDialog();
    // const mnemonicArray = mnemonic.split(' ');
    // if (selected.length === 3 && selectedWords) {
    //   if (
    //     selected[0] === mnemonicArray[selectedWords[0]] &&
    //     selected[1] === mnemonicArray[selectedWords[1]] &&
    //     selected[2] === mnemonicArray[selectedWords[2]]
    //   ) {
    //     // navigation.navigate(SCREENS.CREATE_WALLET_PASSWORD);

    //     showDialog();
    //   } else {
    //     setTries(tries + 1);
    //     setSelected(['', '', '']);
    //     setSelectedWords(randomNumbers(12));
    //     if (tries === 2) {
    //       navigation.goBack();
    //     }
    //   }
    // }
  };

  if (!selectedWords) {
    return null;
  }
  const canSubmit = selected.every(
    (w: any) => w !== null && w !== undefined && w !== '',
  );
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <ScrollView>
          <OnboardingSteps
            total={4}
            fill={2}
            onBack={() => navigation.goBack()}
            showBack={true}
          />
          <OnboardingHeader
            title={'verify_phrase'}
            subtitle="verify_phrase_subtitle"
            info="verify_phrase_info"
          />
          <VerifySecretPhrase
            setSelected={setSelected}
            selected={selected}
            phrase={mnemonic.split(' ')}
            selectedWords={selectedWords}
          />
        </ScrollView>
        <View style={styles.bottom}>
          <Button
            onPress={validate}
            disabled={!canSubmit}
            variant="contained"
            sx={{marginTop: 20}}>
            {formatMessage({
              id: 'continue',
            })}
          </Button>
        </View>
      </View>

      <ConfirmBackup
        onConfirm={onConfirm}
        visible={visible}
        hideDialog={hideDialog}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default VerifyBackupScreen;
