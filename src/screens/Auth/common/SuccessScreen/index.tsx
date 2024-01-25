import React from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Image} from 'react-native';
import {Typography, Button} from '@ui/core/components';
import OnboardingSteps from '@components/OnboardingSteps';
import {SCREENS} from '@screens/screens';

const SuccessScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();

  const handleNext = () => {
    navigation.navigate(SCREENS.APPLICATION_SCREEN);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <OnboardingSteps total={4} fill={4} />
        <Image
          source={require('../../../../assets/onboarding/completed.png')}
          style={styles.image}
        />
        <ScrollView style={styles.titleContainer}>
          <Typography
            variant="headlineLarge"
            sx={{textAlign: 'center', fontWeight: 'bold'}}>
            {formatMessage({
              id: 'congratulation',
            })}
          </Typography>
          <Typography
            sx={{textAlign: 'center', marginTop: 10}}
            variant="titleMedium">
            {formatMessage({
              id: 'wallet_created_subtitle',
            })}
          </Typography>
          <Typography
            sx={{textAlign: 'center', marginTop: 10}}
            variant="titleMedium">
            {formatMessage({
              id: 'wallet_created_subtitle_2',
            })}
          </Typography>
        </ScrollView>
        <View style={styles.bottom}>
          <Button variant="contained" onPress={handleNext} sx={{marginTop: 20}}>
            {formatMessage({
              id: 'done',
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
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
  titleContainer: {
    paddingHorizontal: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default SuccessScreen;
