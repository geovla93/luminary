import CourseCard from '@screens/Wallet/LearnScreen/components/CourseCard';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Course} from '@itypes/general-purpose';

const CoursesGrid = ({courses}: {courses: Course[]}) => {
  return (
    <View style={styles.coursesWrapper}>
      {courses.map((course, index) => (
        <CourseCard key={`course-${index}`} course={course} />
      ))}
    </View>
  );
};

export default CoursesGrid;

const styles = StyleSheet.create({
  coursesWrapper: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
