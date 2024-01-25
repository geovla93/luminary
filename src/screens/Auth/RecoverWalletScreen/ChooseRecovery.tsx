import React, {useCallback, useMemo, useState} from 'react';
import {Button} from '@ui/core/components';
import OnboardingHeader from '../../../components/OnboardingHeader';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {useAppSelector} from '../../../redux/hook';
import ImportOption from './components/ImportOption';
import {SCREENS} from '@screens/screens';
import OnboardingSteps from '@components/OnboardingSteps';
import {useOnboarding} from '@hooks/useOnboarding';
import {useFocusEffect} from '@react-navigation/native';

const RecoverWalletScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const locale = useAppSelector(state => state.application.locale);
  const [selected, setSelected] = useState('secret_phrase');
  const {playAudioFile} = useOnboarding();

  useFocusEffect(
    useCallback(() => {
      playAudioFile('recover');
    }, []),
  );

  const handleContinue = () => {
    if (selected === 'secret_phrase') {
      navigation.navigate(SCREENS.INSERT_PASSPHRASE_SCREEN);
    }
  };

  const options = useMemo(() => {
    return [
      {
        id: 'secret_phrase',
        icon: require('./assets/secret_phrase.png'),
        title: 'secret_phrase',
        description: 'secret_phrase_subtitle',
        disabled: false,
      },
      {
        id: 'icloud',
        icon: require('./assets/cloud.png'),
        title: 'icloud_backup',
        description: 'icloud_backup_subtitle',
        disabled: true,
      },
      {
        id: 'private_key',
        icon: require('./assets/private_key.png'),
        title: 'private_key',
        description: 'private_key_subtitle',
        disabled: true,
      },
    ];
  }, [locale]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <OnboardingSteps
          showBack
          onBack={() => navigation.goBack()}
          total={3}
          fill={1}
        />
        <OnboardingHeader
          title={'import_wallet'}
          subtitle="import_wallet_subtitle"
        />
        <View style={styles.importOptions}>
          <FlatList
            data={options}
            renderItem={({item}) => (
              <ImportOption
                option={item}
                disabled={item.disabled}
                selected={item.id === selected}
                onPress={() => setSelected(item.id)}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.actionContainer}>
          <Button
            variant="contained"
            onPress={handleContinue}
            sx={{marginTop: 20}}>
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
    paddingHorizontal: 15,
  },
  importOptions: {
    flex: 1,
    marginTop: 20,
  },
  actionContainer: {
    marginBottom: 20,
  },
});

export default RecoverWalletScreen;
