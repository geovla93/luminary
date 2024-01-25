import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';

interface IProps {
  currentPage: number;
  onNext: () => void;
  onBack: () => void;
}

const Pagination = ({currentPage, onNext, onBack}: IProps) => {
  return (
    <View style={styles.root}>
      <IconButton
        icon="chevron-left"
        size={30}
        onPress={onBack}
        disabled={currentPage === 1}
      />
      <IconButton icon="chevron-right" size={30} onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Pagination;
