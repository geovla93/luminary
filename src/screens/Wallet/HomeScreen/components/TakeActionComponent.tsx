import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import TakeActionItem from '@screens/Wallet/HomeScreen/components/TakeActionItem';
import {useWalletContext} from '@hooks/useWalletContext';
import {useWalletAsUser} from '@hooks/useWalletAsUser';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '@screens/screens';

interface INavigation {
  navigate: (screen: string) => void;
}

const TakeActionComponent = () => {
  const {formatMessage} = useIntl();
  const navigation = useNavigation<INavigation>();
  const {wallet, openBackup} = useWalletContext();
  const {user} = useWalletAsUser();

  return (
    <View style={styles.wrapper}>
      <Typography variant="titleSmall" sx={styles.title} color={'white'}>
        {formatMessage({id: 'take_action', defaultMessage: 'Take action!'})}
      </Typography>
      <View>
        <TakeActionItem
          completed={true}
          text={formatMessage({
            id: 'ta_create_wallet',
            defaultMessage: 'Create new wallet',
          })}
        />
        <TakeActionItem
          completed={wallet.backedUp}
          onPress={() => openBackup()}
          text={formatMessage({
            id: 'ta_backup_wallet',
          })}
        />
        <TakeActionItem
          completed={!!user.alias}
          onPress={() =>
            navigation.navigate(SCREENS.APP_CREATE_USERNAME_SCREEN)
          }
          text={formatMessage({
            id: 'ta_set_username',
          })}
        />
        <TakeActionItem
          completed={false}
          text={formatMessage({
            id: 'ta_make_transaction',
          })}
        />

        <TakeActionItem
          completed={false}
          content={
            <View style={styles.giftContainer}>
              <Image style={styles.gift} source={require('@assets/gift.png')} />
              <Button
                size="verySmall"
                disabled
                sx={{
                  marginRight: 5,
                  paddingVertical: 0,
                  height: 32,
                }}
                onPress={() => console.log('claim gift')}>
                {formatMessage({
                  id: 'claim',
                })}
              </Button>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gift: {
    marginLeft: 20,
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
  giftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
export default TakeActionComponent;
