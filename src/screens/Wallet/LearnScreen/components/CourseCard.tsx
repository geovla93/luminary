import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Typography from '../../../../ui/core/components/Typography';
import {colors} from '@ui/core/theme';
import React from 'react';
import {Course} from '@itypes/general-purpose';

const CourseCard = ({course}: {course: Course}) => {
  return (
    <View style={{width: '100%'}}>
      <ImageBackground
        style={styles.imageContainer}
        source={{uri: course.image}}>
        <View
          style={{marginBottom: 10, marginTop: 'auto', paddingHorizontal: 10}}>
          <Typography variant={'titleMedium'} sx={styles.cardTitle}>
            {course.name}
          </Typography>
          <TouchableOpacity onPress={() => {}} style={styles.payButton}>
            {
              <Typography variant={'bodySmall'} sx={styles.payButtonText}>
                Pay {course.price}
              </Typography>
            }
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  // card styles
  imageContainer: {
    width: '100%',
    marginBottom: 20,
    height: 176,
    borderRadius: 15,
    overflow: 'hidden',
  },
  payButtonText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    paddingVertical: 3,
    paddingHorizontal: 0,
    color: colors.primary,
  },
  payButton: {
    backgroundColor: 'background: rgba(30, 27, 22, 0.75);',
    borderRadius: 30,
    width: 110,
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
