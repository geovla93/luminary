import {colors} from '@ui/core/theme';
import React, {useMemo, useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const TextField = ({size, containerStyle, error, ...props}: any) => {
  const [focused, setFocused] = useState(false);
  const height = useMemo(() => {
    switch (size) {
      case 'large':
        return 60;
      case 'medium':
        return 50;
      case 'small':
        return 40;
      default:
        return 40;
    }
  }, [size]);

  const onFocus = () => {
    setFocused(true);
  };
  return (
    <View
      style={[
        styles.containerStyle,
        containerStyle,
        focused ? styles.focused : {},
        error ? styles.error : {},
      ]}>
      {props.left && props.left()}
      <TextInput
        style={{...styles.input, ...props.sx, height}}
        {...props}
        onFocus={() => onFocus()}
        onBlur={() => setFocused(false)}
      />
      {props.right && props.right()}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1E1B18',
    borderWidth: 1,
  },
  focused: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

TextField.defaultProps = {
  sx: {},
  size: 'medium',
  containerStyle: {},
};

export default TextField;
