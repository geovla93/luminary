import Typography from '../../../../../ui/core/components/Typography';
import {ScrollView, StyleSheet, View} from 'react-native';
import LearnSlider from '@components/LearnSlider';
import CoursesGrid from '@screens/Wallet/LearnScreen/components/CoursesGrid';
import React from 'react';

const TabContent = ({
  titleSuggested,
  titleCourses,
  courses,
}: {
  titleSuggested: string;
  titleCourses: string;
  courses: any[];
}) => {
  return (
    <ScrollView style={{paddingTop: 20}} showsHorizontalScrollIndicator={false}>
      <Typography variant={'titleMedium'} sx={styles.sectionTitle}>
        {titleSuggested}
      </Typography>
      <View style={styles.suggestedContent}>
        <LearnSlider />
      </View>

      <Typography variant={'titleMedium'} sx={styles.sectionTitle}>
        {titleCourses}
      </Typography>
      <CoursesGrid courses={courses} />
    </ScrollView>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  screenTitle: {
    fontWeight: '400',
    marginTop: 10,
    fontSize: 32,
    fontFamily: 'Roboto-Medium',
  },
  suggestedContent: {height: 285, paddingTop: 0},
  sectionTitle: {fontWeight: '700', fontFamily: 'Roboto-Bold', marginBottom: 0},
});
