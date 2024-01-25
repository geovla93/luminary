import {Typography} from '@ui/core/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
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

const ProfileCard = () => {
  const navigation = useNavigation<any>();
  const {wallet} = useWalletContext();
  const {formatMessage, formatNumber} = useIntl();
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
          <Typography
            variant="bodyLarge"
            sx={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              fontFamily: 'Roboto-Medium',
            }}>
            USD <Icon name="chevron-down" size={20} />{' '}
          </Typography>
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
            {formatNumber(wallet?.balance.balance, {
              style: 'currency',
              currency: 'USD',
            })}
          </Typography>
        </View>
        <View style={styles.profitContainer}>
          <View>
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
            <Typography
              sx={{
                fontWeight: '400',
                color: 'black',
                fontSize: 20,
                fontFamily: 'Roboto-Medium',
              }}
              variant="bodyLarge">
              $0.00
            </Typography>
          </View>
          <View style={styles.profitPercentage}>
            <Feather
              name="arrow-up-circle"
              size={20}
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
              +0.00%
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
          action={() => console.log('clicked send')}
          text={formatMessage({id: 'earn'})}>
          <UsdCircle />
        </ProfileButton>
        <ProfileButton
          action={() => console.log('clicked send')}
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
});

export default ProfileCard;
