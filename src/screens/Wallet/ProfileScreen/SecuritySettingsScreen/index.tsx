import React, {useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import RNBiometrics from 'react-native-simple-biometrics';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Section from '@components/Section';
import HeaderComponent from '@components/HeaderComponent';
import {Chip, Divider, List, Switch} from 'react-native-paper';
import {colors} from '@ui/core/theme';
import useApplication from '@hooks/useApplication';
import {usePinManager} from '@components/PinManagerProvider';
import {SCREENS} from '@screens/screens';

const SecuritySettingsScreen = () => {
  const navigation = useNavigation<any>();
  const {lockTheApp} = usePinManager();
  const [canUseBiometrics, setCanUseBiometrics] = useState(false);
  const {
    lockingMethod,
    hideBalances,
    changeBalanceDisplay,
    setTheUnlockingMethod,
  } = useApplication();
  const {formatMessage} = useIntl();

  useEffect(() => {
    const checkBiometrics = async () => {
      const canAuthenticate = await RNBiometrics.canAuthenticate();
      setCanUseBiometrics(canAuthenticate);
    };
    checkBiometrics();
  }, []);

  const handleToggleBalances = useCallback(() => {
    if (hideBalances) {
      lockTheApp(() => changeBalanceDisplay(false));
    } else {
      changeBalanceDisplay(true);
    }
  }, [hideBalances]);

  const handleToggleBiometrics = async () => {
    if (lockingMethod === 'biometrics') {
      setTheUnlockingMethod('pin');
    } else {
      setTheUnlockingMethod('biometrics');
      RNBiometrics.requestBioAuth(
        'Confirm your identity',
        'Confirm your identity to enable biometric authentication',
      ).catch(() => {
        setTheUnlockingMethod('pin');
      });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <HeaderComponent
        title="security_and_privacy"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Section title={formatMessage({id: 'settings_security'})}>
          <List.Item
            disabled
            title={formatMessage({id: 'security_change_pin'})}
            style={styles.listItem}
            onPress={() => navigation.navigate(SCREENS.APP_CHANGE_PIN_SCREEN)}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="lock"
              />
            )}
          />
          <Divider />

          <List.Item
            style={styles.listItem}
            title={formatMessage({id: 'settings_biometrics'})}
            disabled={!canUseBiometrics}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="fingerprint"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={lockingMethod === 'biometrics'}
                onValueChange={() => handleToggleBiometrics()}
              />
            )}
          />
          <Divider />
          <List.Item
            style={styles.listItem}
            title={formatMessage({id: 'security_2fa'})}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="shield-lock"
              />
            )}
            right={() => (
              <Chip
                style={{
                  backgroundColor: '#1E1B18',
                }}
                textStyle={{color: colors.primary, fontSize: 12}}
                mode="outlined">
                {formatMessage({id: 'soon'})}
              </Chip>
            )}
          />
        </Section>

        <Section title={formatMessage({id: 'settings_privacy'})}>
          <List.Item
            title={formatMessage({id: 'security_hide_balances'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="eye-off"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={hideBalances}
                onValueChange={() => handleToggleBalances()}
              />
            )}
          />
          <Divider />
          <List.Item
            title={formatMessage({id: 'settings_blocked_contacts'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="account-off"
              />
            )}
            right={() => (
              <Chip
                style={{
                  backgroundColor: '#1E1B18',
                }}
                textStyle={{color: colors.primary, fontSize: 12}}
                mode="outlined">
                {formatMessage({id: 'soon'})}
              </Chip>
            )}
          />
          <Divider />
          <List.Item
            title={formatMessage({id: 'settings_freeze_transactions'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="snowflake"
              />
            )}
            right={() => (
              <Chip
                style={{
                  backgroundColor: '#1E1B18',
                }}
                textStyle={{color: colors.primary, fontSize: 12}}
                mode="outlined">
                {formatMessage({id: 'soon'})}
              </Chip>
            )}
          />
        </Section>
      </View>
    </SafeAreaView>
  );
};

export default SecuritySettingsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  content: {
    marginTop: 20,
  },
  listItem: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 0,
    marginVertical: 0,
  },
});
