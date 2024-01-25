import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  KeyboardEvent,
  Platform,
} from 'react-native';

interface AboveKeyboardProps {
  children: React.ReactNode;
  keyboardAvoidingViewBehaviour: 'padding' | 'height';
  containerStyle?: object;
}

const AboveKeyboard = ({
  children,
  keyboardAvoidingViewBehaviour,
  containerStyle,
}: AboveKeyboardProps) => {
  const [visible, setVisible] = useState(false);
  const [padding, setPadding] = useState<number | undefined>(0);

  const keyboardDidShow = (event: KeyboardEvent) => {
    setPadding(
      Platform.select({
        ios: event.endCoordinates.height - 35,
        android: 0,
      }),
    );
    setVisible(true);
  };

  const keyboardDidHide = (_event: KeyboardEvent) => {
    setPadding(0);
    setVisible(false);
  };

  useEffect(() => {
    const KeyboardOn = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const KeyboardOff = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
    return () => {
      KeyboardOn.remove();
      KeyboardOff.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        width: '100%',
      }}
      behavior={keyboardAvoidingViewBehaviour}>
      <View
        style={[
          visible
            ? {
                marginBottom: Number(padding) + 10,
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }
            : {},
          containerStyle,
        ]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

AboveKeyboard.defaultProps = {
  keyboardAvoidingViewBehaviour: 'padding',
  containerStyle: {},
};

export default AboveKeyboard;
