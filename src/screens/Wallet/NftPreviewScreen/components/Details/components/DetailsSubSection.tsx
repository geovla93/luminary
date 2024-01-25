import React from 'react';
import {Typography} from '@ui/core/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '@ui/core/theme';

const DetailsSubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.wrapper}>
      <Typography variant={'bodyLarge'} sx={styles.sectionTitle}>
        {title}
      </Typography>
      <View style={styles.contentSection}>{children}</View>
    </View>
  );
};

export default DetailsSubSection;

const styles = StyleSheet.create({
  wrapper: {marginTop: 10},
  contentSection: {
    width: '100%',
    backgroundColor: '#221F1A',
    marginTop: 5,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionTitle: {fontFamily: 'Roboto-Medium', fontSize: 14, color: '#fff'},
  contentSectionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#fff',
  },
  textLink: {fontFamily: 'Roboto-Medium', fontSize: 14, color: colors.primary},
});
