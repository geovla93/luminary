import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextField = (props: any) => {
  return <TextInput style={{...styles.input, ...props.sx}} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 15,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: '#1E1B18',
    paddingHorizontal: 20,
  },
});

TextField.defaultProps = {
  sx: {},
};

export default TextField;
