import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Typography} from '@ui/core/components';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import Notification from '@screens/Wallet/NotificationsScreen/components/Notification';
import AINotification from '@screens/Wallet/NotificationsScreen/components/AINotification';

const aiNotifications: any[] = [];
const regularNotifications: any[] = [];

const NotificationsScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#15130E'}}>
      <View style={styles.root}>
        <View style={styles.backContainer}>
          <SquareButton onPress={() => navigation.goBack()} />
        </View>
      </View>
      <View style={styles.content}>
        <Typography variant="titleLarge" sx={styles.screenTitle}>
          Notifications
        </Typography>
        <View>
          {aiNotifications?.length === 0 &&
            regularNotifications?.length === 0 && (
              <Typography
                variant="titleSmall"
                color={colors.primary}
                sx={{marginTop: 20}}>
                {formatMessage({
                  id: 'no_notifications',
                  defaultMessage: 'No notifications',
                })}
              </Typography>
            )}

          {aiNotifications?.length > 0 && (
            <>
              <Typography
                sx={styles.sectionTitle}
                variant="titleSmall"
                color={colors.primary}>
                {formatMessage({id: 'breg_notifications_title'})}
              </Typography>
              <ScrollView
                horizontal={true}
                style={{marginTop: 20}}
                showsHorizontalScrollIndicator={false}>
                {aiNotifications?.map(notification => (
                  <AINotification
                    key={notification.id}
                    type={notification.type}
                    description={notification.description}
                    onPress={() => {}}
                    title={notification.title}
                  />
                ))}
              </ScrollView>
            </>
          )}
          {regularNotifications?.length > 0 && (
            <FlatList
              style={styles.list}
              data={regularNotifications}
              renderItem={item => <Notification item={item.item} />}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backContainer: {},
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  list: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#221F1A',
  },
  sectionTitle: {marginTop: 20, fontSize: 14, fontFamily: 'Roboto-Medium'},
  screenTitle: {fontSize: 32, fontFamily: 'Roboto-Medium', lineHeight: 36},
});

export default NotificationsScreen;
