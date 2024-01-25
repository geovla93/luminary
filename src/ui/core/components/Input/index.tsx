import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const Input = ({sx, ...rest}: any) => {
  return (
    <View style={styles.formControl}>
      <TextInput
        contentStyle={styles.contentStyle}
        // outlineColor="transparent"
        // outlineFocusColor="transparent"
        outlineStyle={styles.outlineStyle}
        style={[styles.searchInput, sx]}
        mode="outlined"
        {...rest}
      />
    </View>
  );
};

Input.Icon = TextInput.Icon;

Input.defaultProps = {
  sx: {},
};

const styles = StyleSheet.create({
  formControl: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentStyle: {
    height: 50,
    borderRadius: 100,
    fontSize: 16,
    backgroundColor: '#1E1B18',
  },
  searchInput: {
    flex: 1,
    height: 50,
    marginBottom: 16,
    borderRadius: 20,
    fontSize: 14,
    backgroundColor: '#1E1B18',
  },
  outlineStyle: {
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    borderRadius: 20,
  },
});

export default Input;
