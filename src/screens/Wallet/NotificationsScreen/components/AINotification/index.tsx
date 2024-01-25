import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LightningIcon from '@ui/core/Icons/LightningIcon';
import FlameIcon from '@ui/core/Icons/FlameIcon';
import {Typography} from '@ui/core/components';
import React from 'react';

const AINotification = ({
  type,
  title,
  description,
  onPress,
}: {
  type: 'hot' | 'important';
  title: string;
  description: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.imageWrapper}>
            <Image source={require('@assets/ai-sphere.png')} />
          </View>
          {type === 'important' ? <LightningIcon /> : <FlameIcon />}
        </View>
        <View style={{marginTop: 10}}>
          <Typography variant={'titleSmall'} sx={styles.title}>
            {title?.substring(0, 30)}
          </Typography>
          <Typography variant={'bodySmall'} sx={styles.content}>
            {description?.substring(0, 30) + '...'}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AINotification;

const styles = StyleSheet.create({
  root: {marginRight: 10},
  container: {
    width: 174,
    height: 161,
    borderRadius: 20,
    backgroundColor: '#221F1A',
    padding: 15,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    padding: 5,
    backgroundColor: '#3C3933',
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
