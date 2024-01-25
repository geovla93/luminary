import React from 'react';
import {SCREENS} from '@screens/screens';
import {Button, Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {openLink} from '@utils/inAppBrowser';
import {links} from '@utils/config';
import {useOnboarding} from '@hooks/useOnboarding';

interface INavigationProps {
  navigation: any;
}

const GetStartedScreen = ({navigation}: INavigationProps) => {
  const {formatMessage} = useIntl();
  const {setOnboardingStarted} = useOnboarding();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <Image
            source={require('@assets/logo-text.png')}
            style={styles.hero}
          />
          <View style={{flexGrow: 1}}>
            <Typography
              fontWeight="bold"
              textAlign="center"
              pb={10}
              variant="headlineLarge">
              {formatMessage({id: 'welcome'})}
            </Typography>
            <Typography mb={140} textAlign="center">
              {formatMessage({id: 'welcome_subtitle'})}
            </Typography>
            <Button
              size="medium"
              textColor="black"
              onPress={() => {
                navigation.navigate(SCREENS.ONBOARDING_SCREEN);
                setOnboardingStarted(true);
              }}>
              {formatMessage({id: 'get_started'})}
            </Button>
          </View>

          <View style={styles.partnerContainer}>
            <Typography fontWeight="bold">
              {formatMessage({id: 'secured_by'})}
            </Typography>
            <View>
              <Image
                source={require('@assets/cyberscope.png')}
                style={styles.partnerLogo}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View>
            <Typography pt={10} pb={10} textAlign="center">
              {formatMessage({id: 'by_tapping_get_started'})} {'\n'}
              <Typography
                onPress={() => {
                  openLink(links.terms);
                }}
                color={colors.primary}
                fontWeight="bold">
                {formatMessage({id: 'terms'})}
              </Typography>{' '}
              {/* {formatMessage({id: 'and'})}{' '}
              <Typography
                onPress={() => {
                  openLink(links.privacy);
                }}
                color={colors.primary}
                fontWeight="bold">
                {formatMessage({id: 'privacy'})}
              </Typography> */}
            </Typography>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  hero: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  heroContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  partnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  partnerLogo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    bottom: 0,
  },
});

export default GetStartedScreen;
