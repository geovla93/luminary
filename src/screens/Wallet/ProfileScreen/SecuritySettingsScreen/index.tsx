import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

const SecuritySettingsScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="titleMedium" sx={styles.headerText}>
            {formatMessage({id: 'security_and_privacy'})}
          </Typography>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.content}>
          <Typography variant="bodyMedium">security settings screen</Typography>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  content: {
    marginTop: 20,
  },
});
