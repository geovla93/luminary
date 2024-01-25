import {useIntl} from 'react-intl';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Typography} from '@ui/core/components';
import React from 'react';

export interface INotification {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const Notification = ({
  item,
  action,
}: {
  item: INotification;
  action?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={action}>
      <View style={styles.container}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.contentWrapper}>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <Typography variant="titleSmall" sx={styles.itemTitle}>
              {item.title}
            </Typography>
            <Typography variant="bodySmall">
              {item.description.substring(0, 40)}
            </Typography>
          </View>
          <View
            style={{alignItems: 'center', justifyContent: 'center', width: 80}}>
            <Typography variant="bodySmall">{item?.date}</Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;

const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4C4639',
    paddingHorizontal: 15,
    flex: 1,
  },
  image: {
    width: 56,
    height: 56,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
});
