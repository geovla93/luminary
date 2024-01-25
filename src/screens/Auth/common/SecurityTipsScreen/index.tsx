/*
Not used: in delete queue
*/

import React, {useRef, useState} from 'react';
import {StyleSheet, Image, View, SafeAreaView, ScrollView} from 'react-native';
import {useIntl} from 'react-intl';
import colors from '@ui/core/theme/colors';
import {colors as xcolors} from '@ui/core/theme';
import {Button, Typography} from '@ui/core/components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import OnboardingHeader from '@components/OnboardingHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {IconButton} from 'react-native-paper';
import {useTemporaryWallet} from '@hooks/wallet/useTemporaryWallet';
import SetWalletPassword from '@components/SetPassword';

const SecurityTipsScreen = ({navigation, route}: any) => {
  const {params} = route;
  const bsRef = useRef<any>(null);
  const {formatMessage} = useIntl();
  const [showPasswordSheet, setShowPasswordSheet] = useState(false);

  const {createTempWallet, setPassword, mode} = useTemporaryWallet();

  const closePasswordSheet = () => {
    bsRef.current?.close();
    setTimeout(() => {
      setShowPasswordSheet(false);
    }, 100);
  };

  const handleNext = (password: string) => {
    setPassword(password);
    if (mode === 'creating') {
      createTempWallet()
        .then(() => {
          navigation.navigate(params.nextScreen);
        })
        .catch((_err: unknown) => {
          console.log(_err);
        });
    } else {
      navigation.navigate(params.nextScreen);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.wrapper}>
        <View style={styles.backIcon}>
          <IconButton
            onPress={() => navigation.goBack()}
            iconColor={xcolors.primary}
            size={scale(25)}
            style={{borderRadius: 16, elevation: 2}}
            mode="contained"
            icon="arrow-left"
          />
        </View>

        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.itemContainer}
            showsVerticalScrollIndicator={false}>
            <OnboardingHeader title={'security_tips'} />
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('./security.png')} />
            </View>
            <View style={styles.itemTitle}>
              <Icon name="info-outline" size={25} color={xcolors.primary} />
              <Typography variant="bodyMedium" sx={styles.title}>
                {formatMessage({id: 'tip_1_title'})}
              </Typography>
            </View>
            <Typography variant="bodyMedium" sx={styles.subtitle}>
              {formatMessage({id: 'tip_1_description'})}
            </Typography>
            <View style={styles.itemTitle}>
              <Icon name="info-outline" size={25} color={xcolors.primary} />
              <Typography variant="bodyMedium" sx={styles.title}>
                {formatMessage({id: 'tip_1_title'})}
              </Typography>
            </View>
            <Typography variant="bodyMedium" sx={styles.subtitle}>
              {formatMessage({id: 'tip_1_description'})}
            </Typography>
          </ScrollView>
          <View style={styles.actionContainer}>
            <Button
              variant="contained"
              disabled={false}
              onPress={() => setShowPasswordSheet(true)}
              sx={{marginTop: verticalScale(20)}}>
              {formatMessage({
                id: 'continue',
              })}
            </Button>
          </View>
        </View>
      </View>
      {showPasswordSheet && (
        <SetWalletPassword
          bsRef={bsRef}
          onClose={closePasswordSheet}
          onValidPasswordSet={(pass: string) => handleNext(pass)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: scale(15),
  },
  container: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
  background: {
    backgroundColor: colors['N-10'],
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(200),
    height: verticalScale(200),
    resizeMode: 'contain',
  },
  itemContainer: {
    flexGrow: 1,
  },
  itemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  title: {
    fontWeight: '600',
    color: 'white',
    marginLeft: scale(10),
  },
  subtitle: {
    marginTop: verticalScale(10),
    color: 'white',
  },
  actionContainer: {
    marginBottom: verticalScale(20),
  },
  iconContainer: {
    position: 'absolute',
    top: scale(10),
    right: verticalScale(10),
    zIndex: 100,
  },
  backIcon: {
    justifyContent: 'center',
    top: 0,
    left: scale(0),
  },
});

export default SecurityTipsScreen;
