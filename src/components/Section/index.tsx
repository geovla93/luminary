import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section = ({title, children}: SectionProps) => {
  return (
    <View style={styles.root}>
      <Typography mb={5} fontWeight="bold" variant="bodyMedium">
        {title}
      </Typography>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
  content: {
    marginTop: 5,
    backgroundColor: '#1E1B18',
    borderRadius: 15,
  },
});

export default Section;
