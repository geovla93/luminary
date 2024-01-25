import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import HeaderComponent from '@components/HeaderComponent';

const ChangePinScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        title="change_pin"
        onBack={() => navigation.goBack()}
        text={formatMessage({id: 'change_pin_text'})}
      />
      <View>
        <Typography variant={'titleSmall'}>change pin</Typography>
      </View>
    </SafeAreaView>
  );
};

export default ChangePinScreen;

const styles = StyleSheet.create({});
