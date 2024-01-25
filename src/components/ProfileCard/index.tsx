import {Typography} from '@ui/core/components';
import React, {useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileButton} from '@components/ProfileButton';
import Telegram from '@ui/core/Icons/Telegram';
import UsdCircle from '@ui/core/Icons/UsdCircle';
import Chart from '@ui/core/Icons/Chart';
import ArrowDown from '@ui/core/Icons/ArrowDown';
import {useNavigation} from '@react-navigation/native';
import {useIntl} from 'react-intl';
import {SCREENS} from '@screens/screens';
import {useWalletContext} from '@hooks/useWalletContext';
import useApplication from '@hooks/useApplication';
import {usePinManager} from '@components/PinManagerProvider';

const ProfileCard = () => {
  const navigation = useNavigation<any>();
  const {wallet} = useWalletContext();
  const {lockTheApp} = usePinManager();
  const {currency, hideBalances, priceDisplay, changeBalanceDisplay} =
    useApplication();
  const {formatMessage} = useIntl();

  const handleToggleBalances = useCallback(() => {
    if (hideBalances) {
      lockTheApp(() => changeBalanceDisplay(false));
    } else {
      changeBalanceDisplay(true);
    }
  }, [hideBalances]);

  const change = useMemo(() => {
    const values = {
      color: 'black',
      icon: 'minus-circle',
      value: '0.00',
    };
    if (wallet.balance?.change > 0) {
      values.color = '#00b500';
      values.icon = 'arrow-up-circle';
      values.value = wallet.balance?.change?.toFixed(2);
    } else if (wallet.balance?.change < 0) {
      values.color = '#DC143C';
      values.icon = 'arrow-down-circle';
      values.value = wallet.balance?.change?.toFixed(2);
    }
    return values;
  }, [wallet?.balance?.change]);

  return (
    <>
      <LinearGradient
        colors={[
          'rgba(236, 194, 72, 1)',
          'rgba(247, 230, 150, 1)',
          'rgba(236, 194, 72, 1)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <View style={styles.balanceTitle}>
          <View style={styles.currentBalance}>
            <Typography
              sx={{
                fontWeight: '600',
                color: 'black',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
              }}
              variant="bodyLarge">
              {formatMessage({id: 'current_balance'})}
            </Typography>
            <Pressable
              onPress={() => handleToggleBalances()}
              style={styles.privacy}>
              <Icon
                name={hideBalances ? 'eye' : 'eye-off'}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate(SCREENS.APP_SELECT_CURRENCY_SCREEN)
            }>
            <Typography
              variant="bodyLarge"
              sx={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                fontFamily: 'Roboto-Medium',
              }}>
              {currency?.toUpperCase()} <Icon name="chevron-down" size={20} />{' '}
            </Typography>
          </Pressable>
        </View>
        <View>
          <Typography
            sx={{
              fontWeight: '500',
              color: 'black',
              marginVertical: 10,
              fontSize: 32,
              fontFamily: 'Roboto-Medium',
            }}
            variant="displaySmall">
            {priceDisplay(wallet?.balance?.balance)}
          </Typography>
        </View>
        <View style={styles.profitContainer}>
          <View>
            <View style={styles.privacyButtonContainer}>
              <Typography
                sx={{
                  fontWeight: '500',
                  color: 'black',
                  fontSize: 20,
                  fontFamily: 'Roboto-Medium',
                }}
                variant="titleLarge">
                {formatMessage({id: 'profit'})}
              </Typography>
            </View>

            <Typography
              sx={{
                fontWeight: '400',
                color: 'black',
                fontSize: 20,
                fontFamily: 'Roboto-Medium',
              }}
              variant="bodyLarge">
              {priceDisplay(wallet?.balance?.profit)}
            </Typography>
          </View>
          <View style={styles.profitPercentage}>
            <Feather
              name={change.icon}
              size={20}
              color={change.color}
              style={{marginRight: 5}}
            />
            <Typography
              sx={{
                fontWeight: '500',
                color: 'black',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                lineHeight: 22,
              }}
              variant="bodyLarge">
              {change.value}%
            </Typography>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.actionsContainer}>
        <ProfileButton
          action={() => navigation.navigate(SCREENS.APP_SEND_CRYPTO_SCREEN)}
          text={formatMessage({id: 'send'})}>
          <Telegram />
        </ProfileButton>
        <ProfileButton
          action={() => navigation.navigate(SCREENS.APP_RECEIVE_CRYPTO_SCREEN)}
          text={formatMessage({id: 'receive'})}>
          <ArrowDown />
        </ProfileButton>
        <ProfileButton
          action={() => navigation.navigate(SCREENS.APP_EARN_SCREEN)}
          text={formatMessage({id: 'earn'})}>
          <UsdCircle />
        </ProfileButton>
        <ProfileButton
          action={() => navigation.navigate(SCREENS.APP_INVEST_SCREEN)}
          text={formatMessage({id: 'invest'})}>
          <Chart />
        </ProfileButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 24,
  },
  balanceTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profitPercentage: {
    backgroundColor: 'rgba(23, 22, 19, 0.09)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  currentBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    // top: -50,
    width: '100%',
  },
  warnColor: {
    backgroundColor: '#f78d1e',
  },
  blue: {
    backgroundColor: '#00b5b9',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  green: {
    backgroundColor: '#00b500',
  },
  action: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: '#e30e77',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  privacy: {
    marginLeft: 10,
  },
  privacyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileCard;
