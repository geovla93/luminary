import React, {useCallback, useRef} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import OnboardingHeader from '@components/OnboardingHeader';
import {useIntl} from 'react-intl';
import {Button} from '@ui/core/components';
import SeedPhrasePreview from '@components/SeedPhrasePreview';
import {SCREENS} from '@screens/screens';
import {useTemporaryWallet} from '@hooks/wallet/useTemporaryWallet';
import OnboardingSteps from '@components/OnboardingSteps';
import {Mnemonic} from 'ethers';
import {useOnboarding} from '@hooks/useOnboarding';
import {useFocusEffect} from '@react-navigation/native';

const InsertPassPhraseScreen = ({navigation}: any) => {
  const {playAudioFile} = useOnboarding();
  const {formatMessage} = useIntl();
  const scrollViewRef = useRef<any>();
  const {seedPhrase, setSeedPhrase} = useTemporaryWallet();

  useFocusEffect(
    useCallback(() => {
      playAudioFile('seedphrase');
    }, []),
  );

  const handleRecover = async () => {
    if (Mnemonic.isValidMnemonic(seedPhrase)) {
      navigation.navigate(SCREENS.WALLET_DERIVATION_PATH_SCREEN);
    } else {
      Alert.alert('Invalid seed phrase');
    }
  };

  const handleChange = (e: any) => {
    const text = e.nativeEvent.text;
    const regex = /^[a-zA-Z\s]+$/;
    if (regex.test(text) || text === '' || text === ' ') {
      setSeedPhrase(text);
    }
  };

  const handleOnFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 200);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          style={styles.wrapper}>
          <OnboardingSteps
            showBack
            onBack={() => {
              setSeedPhrase('');
              navigation.goBack();
            }}
            total={3}
            fill={2}
          />
          <OnboardingHeader
            title={'enter_seed'}
            subtitle="enter_seed_subtitle"
            info="enter_seed_info"
          />
          <View style={styles.contentContainer}>
            <SeedPhrasePreview phrase={seedPhrase} />
            <View style={styles.passPhraseContainer}>
              <TextInput
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                value={seedPhrase}
                onFocus={handleOnFocus}
                onChange={handleChange}
                label={formatMessage({
                  id: 'pass_phrase_label',
                })}
                style={styles.passPhrase}
                multiline
                mode="outlined"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.actionContainer}>
          <Button
            disabled={seedPhrase.split(' ').length !== 12}
            onPress={handleRecover}
            size="medium"
            sx={{marginTop: 20}}>
            {formatMessage({
              id: 'continue',
            })}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  actionContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  passPhraseContainer: {
    // marginTop: 20,
  },
  passPhrase: {},
});

export default InsertPassPhraseScreen;
