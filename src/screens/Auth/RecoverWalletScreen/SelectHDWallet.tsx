import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import ScreenContainer from '@components/ScreenContainer';
import OnboardingHeader from '@components/OnboardingHeader';
import OnboardingSteps from '@components/OnboardingSteps';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import DerivationPathSelector from '@components/DerivationPathSelector';
import DerivationPathModal from '@components/DerivationPathSelector/DerivationPathModal';
import derivationPaths from 'src/blockchain/derivationPath';
import AddressSelector from '@components/AddressesSelector';
import {useTemporaryWallet} from '@hooks/wallet/useTemporaryWallet';
import {IWalletAddresses} from '@itypes/wallet';
import {usePinManager} from '@components/PinManagerProvider';
import BiometricsDialog from '@components/BiometricsDialog';
import {DEFAULT_DERIVATION_PATH} from 'src/configs/security';
import Button from '@ui/core/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useOnboarding} from '@hooks/useOnboarding';
import {Typography} from '@ui/core/components';

interface INav {
  goBack: () => void;
  navigate: (screen: string) => void;
}

const SelectHDWalletScreen = () => {
  const {formatMessage} = useIntl();
  const navigation = useNavigation<INav>();
  const {getAddressesByDerivationPaths, recoverWallet, securedStoreWalletData} =
    useTemporaryWallet();
  const {handleSetPin, dismiss} = usePinManager();
  const [showBiometricsDialog, setShowBiometricsDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [perPage, setPerPage] = useState(1);
  const [derivationPathIndex, setDerivationPathIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState("m/44'/60'/0'/0/n");
  const [userSelectedPath, setUserSelectedPath] = useState(
    DEFAULT_DERIVATION_PATH,
  );
  const {playAudioFile} = useOnboarding();
  const [addresses, setAddresses] = useState<IWalletAddresses[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef<any>(null);
  const [mode, setMode] = useState<string>('simple');

  useFocusEffect(
    useCallback(() => {
      playAudioFile('selecthd');
    }, []),
  );

  const changeDerivationPathIndex = (index: number) => {
    setDerivationPathIndex(index);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    modalRef.current.close();
    setTimeout(() => {
      setIsModalVisible(false);
    }, 200);
  };

  const handleOpen = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setIsModalVisible(true);
    }, 200);
  };

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentPage(prev => {
      if (prev === 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  const onDerivationPathChange = (value: string) => {
    setCurrentPath(value);
  };

  useEffect(() => {
    const selectedPath = derivationPaths[derivationPathIndex];
    const {regex} = selectedPath;
    const isValid = regex.test(currentPath);
    let currentPagePaths = [];
    if (isValid) {
      currentPagePaths.push(currentPath);
    } else {
      for (let i = 0; i < perPage; i++) {
        const nIndex = i + (currentPage - 1) * perPage;
        currentPagePaths.push(currentPath.replace('n', `${nIndex}`));
      }
    }
    setUserSelectedPath(currentPagePaths[0]);
    getAddressesByDerivationPaths(currentPagePaths).then(res => {
      setAddresses(res);
    });
  }, [currentPath, currentPage, perPage]);

  useEffect(() => {
    setCurrentPage(1);
    setCurrentPath(derivationPaths[derivationPathIndex].path);
  }, [derivationPathIndex]);

  const onComplete = async (withBiometrics: boolean) => {
    await securedStoreWalletData(pin, withBiometrics);
  };

  const handleModeToggle = () => {
    if (mode === 'simple') {
      setMode('advanced');
      setPerPage(4);
    } else {
      setPerPage(1);
      setMode('simple');
    }
  };

  const recoverTheWallet = async () => {
    // The final step is here
    playAudioFile('recoverypin', false, true);
    await recoverWallet(userSelectedPath);
    handleSetPin(
      (_pin: string) => {
        setPin(_pin);
        setShowBiometricsDialog(true);
      },
      () => {
        dismiss();
      },
    );
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}>
        <View style={styles.root}>
          <OnboardingSteps
            total={3}
            fill={3}
            showBack={true}
            onBack={() => navigation.goBack()}
          />
          <OnboardingHeader
            title={'select_your_address'}
            subtitle={mode === 'simple' ? 'select_wallet_advanced' : ''}
          />
          <Pressable onPress={handleModeToggle} style={styles.listHeader}>
            <Typography variant="titleMedium" color="white" fontWeight="bold">
              {formatMessage({id: 'advanced'})}
            </Typography>
            <Icon
              name={`${mode === 'simple' ? 'plus-circle' : 'minus-circle'}`}
              size={30}
              color="white"
            />
          </Pressable>
          {mode !== 'simple' && (
            <View style={styles.container}>
              <DerivationPathSelector
                onChange={onDerivationPathChange}
                selected={derivationPathIndex}
                openPathsModal={() => handleOpen()}
              />
            </View>
          )}
          <View style={styles.container}>
            <AddressSelector
              addresses={addresses}
              mode={mode}
              onModeToggle={handleModeToggle}
              perPage={perPage}
              selected={userSelectedPath}
              onSelect={(p: string) => setUserSelectedPath(p)}
              handleNext={handleNext}
              handleBack={handleBack}
              currentPage={currentPage}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              disabled={!userSelectedPath}
              onPress={() => recoverTheWallet()}>
              {formatMessage({id: 'continue'})}
            </Button>
          </View>
        </View>
        {isModalVisible && (
          <DerivationPathModal
            selectedIndex={derivationPathIndex}
            onChangePath={changeDerivationPathIndex}
            bottomSheetRef={modalRef}
            onClose={handleCloseModal}
          />
        )}
        {showBiometricsDialog && (
          <BiometricsDialog onSet={(enabled: boolean) => onComplete(enabled)} />
        )}
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 20,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingBottom: 5,
  },
});

export default SelectHDWalletScreen;
