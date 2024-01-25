import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({children}: PropsWithChildren<{}>) => {
  return <View style={styles.container}>{children}</View>;
};

Card.defaultProps = {
  children: null,
};

const styles = StyleSheet.create({
  container: {},
});

export default Card;
