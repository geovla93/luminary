import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useIntl} from 'react-intl';
import HeaderComponent from '@components/HeaderComponent';
import Section from '@components/Section';
import {Divider, List, Switch} from 'react-native-paper';
import {colors} from '@ui/core/theme';

const NotificationsSettingsScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();

  return (
    <SafeAreaView style={styles.root}>
      <HeaderComponent
        title="notifications"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Section title={formatMessage({id: 'settings_notif_general'})}>
          <List.Item
            title={formatMessage({id: 'settings_notif_portfolio_volatility'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="bell"
              />
            )}
            right={() => (
              <Switch
                disabled={true}
                color={colors.primary}
                value={true}
                onValueChange={() => {}}
              />
            )}
          />
          <Divider />
          <List.Item
            title={formatMessage({id: 'settings_notif_critical_news'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="newspaper"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={true}
                disabled={true}
                onValueChange={() => {}}
              />
            )}
          />
          <Divider />
          <List.Item
            title={formatMessage({id: 'settings_notif_breg'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="robot"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={true}
                disabled={true}
                onValueChange={() => {}}
              />
            )}
          />
          <Divider />
          <List.Item
            title={formatMessage({id: 'settings_notif_market_updates'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="chart-line"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={true}
                disabled={true}
                onValueChange={() => {}}
              />
            )}
          />
        </Section>
        <Section title={'Marketing'}>
          <List.Item
            title={formatMessage({id: 'settings_notif_promotions'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="gift"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={true}
                disabled={true}
                onValueChange={() => {}}
              />
            )}
          />
          <Divider />
          <List.Item
            title={formatMessage({id: 'settings_notif_earn'})}
            style={styles.listItem}
            left={() => (
              <List.Icon
                style={styles.iconStyle}
                color={colors.primary}
                icon="currency-usd"
              />
            )}
            right={() => (
              <Switch
                color={colors.primary}
                value={true}
                disabled={true}
                onValueChange={() => {}}
              />
            )}
          />
        </Section>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsSettingsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
