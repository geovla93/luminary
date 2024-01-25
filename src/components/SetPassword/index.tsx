import React, {useMemo, useState, useCallback, useEffect, Ref} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {verticalScale} from 'react-native-size-matters';

import {StyleSheet, View} from 'react-native';
import {Button, Typography} from '@ui/core/components';
import SquareButton from '@ui/core/components/SquareButton';
import {useIntl} from 'react-intl';
import {colors} from '@ui/core/theme';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

interface SetWalletPasswordProps {
  bsRef: Ref<BottomSheetMethods>;
  onClose: () => void;
  onValidPasswordSet: (password: string) => void;
}

const SetWalletPassword = ({
  bsRef,
  onClose,
  onValidPasswordSet,
}: SetWalletPasswordProps) => {
  const {formatMessage} = useIntl();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const snapPoints = useMemo(() => ['70%'], []);
  // const snapPoints = ['70%'];
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const validatePassword = () => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setError('pass_min_length');
      return false;
    }

    if (!hasUpperCase) {
      setError('pass_uppercase');
      return false;
    }

    if (!hasLowerCase) {
      setError('pass_lowercase');
      return false;
    }

    if (!hasNumbers) {
      setError('pass_number');
      return false;
    }

    if (!hasSpecialChar) {
      setError('pass_special');
      return false;
    }

    if (password !== confirmPassword) {
      setError('pass_match');
      return false;
    }

    setError('');
    return true;
  };
  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  return (
    <BottomSheet
      ref={bsRef}
      handleStyle={styles.handle}
      snapPoints={snapPoints}
      index={0}
      onChange={handleSheetChanges}
      keyboardBehavior="interactive"
      enableDynamicSizing={false}
      keyboardBlurBehavior={'restore'}
      backgroundStyle={styles.content}>
      <BottomSheetScrollView>
        <View style={styles.actions}>
          <SquareButton icon="close" onPress={onClose} />
        </View>
        <View style={styles.theContent}>
          <Typography
            variant="headlineSmall"
            sx={{marginBottom: 10}}
            fontWeight="bold">
            {formatMessage({id: 'create_wallet_password'})}
          </Typography>
          <Typography sx={{marginBottom: 20}} variant="bodyLarge">
            {formatMessage({id: 'create_wallet_password_info'})}
          </Typography>
          <BottomSheetTextInput
            placeholder={formatMessage({id: 'password'})}
            value={password}
            secureTextEntry
            placeholderTextColor="#8E8E8E"
            onChangeText={(value: string) => setPassword(value)}
            style={styles.input}
            focusable
          />

          <BottomSheetTextInput
            placeholder={formatMessage({id: 'password_confirm'})}
            value={confirmPassword}
            placeholderTextColor="#8E8E8E"
            secureTextEntry
            onChangeText={(value: string) => setConfirmPassword(value)}
            style={styles.input}
            focusable
          />
          {!!error && (
            <Typography
              sx={{color: colors.primary, padding: 10}}
              variant="bodySmall">
              {formatMessage({
                id: error,
              })}
            </Typography>
          )}
          <Button
            variant="contained"
            size="medium"
            disabled={!!error || !password || !confirmPassword}
            onPress={() => onValidPasswordSet(password)}
            sx={{marginTop: verticalScale(20)}}>
            {formatMessage({
              id: 'continue',
            })}
          </Button>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  root: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  content: {
    backgroundColor: '#1E1816',
  },
  handle: {
    display: 'none',
  },
  theContent: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#221F1A',
    borderRadius: 15,
    marginVertical: 10,
    fontSize: 18,
    marginBottom: 10,
    height: 60,
    paddingHorizontal: 20,
    color: 'white',
  },
});

export default SetWalletPassword;
