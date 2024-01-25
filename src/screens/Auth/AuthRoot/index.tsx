import React, {useMemo, useState, useRef} from 'react';
import {Typography, Button} from '@ui/core/components';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  VirtualizedList,
} from 'react-native';
import {useAppSelector} from '../../../redux/hook';
import {useIntl} from 'react-intl';
import OnboardingItem from './components/OnboardingItem';
import Paginator from './components/Paginator';
import {SCREENS} from '../../screens';
import {scale, moderateScale} from 'react-native-size-matters';
import {useTemporaryWallet} from '@hooks/wallet/useTemporaryWallet';
import {usePinManager} from '@components/PinManagerProvider';
import BiometricsDialog from '@components/BiometricsDialog';
import {useOnboarding} from '@hooks/useOnboarding';
// import {ScrollView} from 'react-native-gesture-handler';

const AuthRootScreen = ({navigation}: any) => {
  const {handleSetPin, dismiss} = usePinManager();
  const {
    createTempWallet,
    securedStoreWalletData,
    setWalletMode,
    resetTemporaryWalletState,
  } = useTemporaryWallet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBiometricsDialog, setShowBiometricsDialog] = useState(false);
  const {playAudioFile} = useOnboarding();
  const [pin, setPin] = useState('');
  const slidesRef = useRef(null);
  const {locale} = useAppSelector(state => state.application);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {formatMessage} = useIntl();
  const steps = useMemo(() => {
    return [
      {
        id: '1',
        image: require('../../../assets/onboarding/crypto.png'),
        title: formatMessage({
          id: 'onboarding_title_0',
          defaultMessage: 'Secure crypto wallet',
        }),
      },
      {
        id: '2',
        image: require('../../../assets/onboarding/ai.png'),
        title: formatMessage({
          id: 'onboarding_title_1',
          defaultMessage: 'AI Mentor',
        }),
      },
      {
        id: '3',
        image: require('../../../assets/onboarding/dapps.png'),
        title: formatMessage({
          id: 'onboarding_title_2',
          defaultMessage: 'dApps',
        }),
      },
    ];
  }, [locale]);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const onComplete = async (withBiometrics: boolean) => {
    await securedStoreWalletData(pin, withBiometrics);
  };

  const handleCreateWallet = async () => {
    playAudioFile('create_wallet');
    setWalletMode('creating');
    await createTempWallet();
    handleSetPin(
      (_pin: string) => {
        setPin(_pin);
        setShowBiometricsDialog(true);
      },
      () => {
        resetTemporaryWalletState();
        dismiss();
        playAudioFile('create_wallet', true);
      },
    );
  };

  const handleRecoverWallet = () => {
    setWalletMode('recovering');
    navigation.navigate(SCREENS.RECOVER_WALLET_ROOT_SCREEN);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}>
        <VirtualizedList
          renderItem={({item}) => <OnboardingItem item={item} />}
          getItem={(data, index) => data[index]}
          data={steps}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item: any) => item.id}
          getItemCount={data => data.length}
          horizontal
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          pagingEnabled
          scrollEventThrottle={scale(32)}
          ref={slidesRef}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
        />
      </View>
      <View style={styles.actions}>
        <Typography
          sx={{fontWeight: 'bold', fontSize: moderateScale(36)}}
          variant="displaySmall">
          {steps[currentIndex].title}
        </Typography>
        <Paginator data={steps} scrollX={scrollX} />
        <View style={styles.footerContainer}>
          <Button
            size="medium"
            variant="contained"
            onPress={handleCreateWallet}>
            {formatMessage({
              id: 'create_wallet',
            })}
          </Button>
          <Button
            variant="elevated"
            textColor="white"
            size="medium"
            onPress={handleRecoverWallet}
            sx={{marginTop: 20}}>
            {formatMessage({
              id: 'recover_wallet',
            })}
          </Button>
        </View>
      </View>
      {showBiometricsDialog && (
        <BiometricsDialog onSet={(enabled: boolean) => onComplete(enabled)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    flex: 1,
    width: '100%',
  },
  actions: {
    flex: 1,
    width: '100%',
    paddingHorizontal: moderateScale(15),
    // paddingTop: scale(20),
  },
  agreement: {
    fontSize: 10,
    textAlign: 'center',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: moderateScale(10),
  },
  container: {
    flex: 1,
  },
});

export default AuthRootScreen;
