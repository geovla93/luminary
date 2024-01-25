import React, {useEffect, useState} from 'react';

import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
// import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import MicrophoneIcon from '@ui/core/Icons/MicrophoneIcon';
import {useIntl} from 'react-intl';
import BregNoMessages from './BregNoMessages';
import AboveKeyboard from '@components/AboveKeyboard';
import BregChatMessages from './BregChatMessages';
import {IconButton} from 'react-native-paper';

const BregChat = ({onClose}: {onClose: () => void}) => {
  const {formatMessage} = useIntl();
  const [mode, setMode] = useState<'text' | 'voice' | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  const onInputFocus = () => {
    setMode('text');
  };
  const switchToVoice = () => {
    Keyboard.dismiss();
    setMode('voice');
    setMessage('');
  };

  useEffect(() => {
    if (!message && mode) {
      setMessages([
        ...messages,
        {
          text: 'I am still learning... Smarter me is coming soon!',
          kind: 'text',
          type: 'received',
        },
      ]);
    }
  }, [message]);

  const sendMessage = () => {
    setMessages([...messages, {text: message, kind: 'text', type: 'sent'}]);
    setMessage('');
  };
  return (
    <>
      <View style={styles.header}>
        <SquareButton icon="close" onPress={onClose} />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {messages.length === 0 && <BregNoMessages />}
          {mode !== null && <BregChatMessages messages={messages} />}
          <AboveKeyboard keyboardAvoidingViewBehaviour="padding">
            <View style={styles.inputContainer}>
              <TextInput
                onChange={e => setMessage(e.nativeEvent.text)}
                value={message}
                onFocus={onInputFocus}
                placeholder={formatMessage({
                  id: 'type_your_message',
                })}
                style={styles.input}
              />
              {mode === 'text' && (
                <IconButton
                  icon={message ? 'arrow-up' : 'microphone'}
                  containerColor={colors.primary}
                  iconColor="black"
                  size={30}
                  onPress={() => (message ? sendMessage() : switchToVoice())}
                />
              )}
            </View>
          </AboveKeyboard>
          {mode !== 'text' && (
            <TouchableOpacity
              onPress={() => console.log('start chat')}
              style={{marginTop: 20}}>
              <ImageBackground
                source={require('@assets/breg_button.png')}
                style={styles.startChatButton}>
                <MicrophoneIcon />
              </ImageBackground>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    // opacity: 0.9,
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    flexGrow: 1,
    backgroundColor: colors.background,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    shadowColor: colors.primary,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    color: colors.primary,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  chatTitle: {
    fontSize: 32,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
    lineHeight: 40,
  },
  startChatButton: {
    width: 98,
    height: 98,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BregChat;
