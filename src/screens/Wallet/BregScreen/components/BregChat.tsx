import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
// import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import Sound from 'react-native-sound';
import {apiUrl} from 'src/api/config';
import useBreg from '@hooks/useBreg';
import BregChatText from './BregChatText';
import {IconButton} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import {useIntl} from 'react-intl';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';
// import BregChatVoice from './BregChatVoice';

const toastProps = {
  duration: 1000,
  placement: 'top',
  textStyle: {
    color: colors.onPrimary,
    fontWeight: 'bold',
  },
  style: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.onPrimary,
  },
} as ToastProps;

const BregChat = ({
  onClose,
  askBreg,
}: {
  onClose: () => void;
  askBreg: (message: string, mode: 'text' | 'audio') => Promise<any>;
}) => {
  const flatListRef = useRef<any>(null);
  const {formatMessage} = useIntl();
  const {messages, addMessage} = useBreg();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'text' | 'audio' | null>('text');
  const [message, setMessage] = useState<string>('');
  const audioFile = useRef<any>(null);

  const onInputFocus = () => {
    // setMode('text');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 200);
  };
  const switchToVoice = () => {
    Keyboard.dismiss();
    setMode('audio');
    setMessage('');
  };

  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 500);
    }
  }, [messages.length, flatListRef.current]);

  const sendMessage = useCallback(() => {
    if (!message) {
      return;
    }
    setLoading(true);
    addMessage({text: message, kind: 'text', type: 'sent'});
    setMessage('');
    askBreg(message, mode || 'text').then((res: any) => {
      addMessage({text: res.data.message, kind: 'text', type: 'received'});
      if (mode === 'text') {
        setLoading(false);
      }
      if (res.data.file) {
        audioFile.current = new Sound(
          apiUrl + res.data.file,
          undefined,
          error => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }
            audioFile.current.play((success: boolean) => {
              if (success) {
                audioFile.current.release();
                setLoading(false);
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          },
        );
      }
    });
  }, [mode, message]);

  const handleChangeMode = useCallback(() => {
    toast.hideAll();
    if (mode === 'text') {
      setMode('audio');
      toast.show(formatMessage({id: 'switched_to_audio'}), toastProps);
    } else {
      setMode('text');
      toast.show(formatMessage({id: 'switched_to_chat'}), toastProps);
    }
  }, [mode]);

  return (
    <View style={{flex: 1, marginVertical: Platform.OS === 'ios' ? 0 : 10}}>
      <View style={styles.header}>
        <IconButton
          iconColor="black"
          onPress={handleChangeMode}
          containerColor={colors.primary}
          icon={
            mode === 'text'
              ? 'account-tie-voice-outline'
              : 'message-processing-outline'
          }
        />
        <View>
          <SquareButton icon="close" onPress={onClose} />
        </View>
      </View>
      {/* {mode === 'text' && ( */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : undefined}>
        <BregChatText
          mode={mode}
          flatListRef={flatListRef}
          loading={loading}
          messages={messages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          onInputFocus={onInputFocus}
          switchToVoice={switchToVoice}
        />
      </KeyboardAvoidingView>
      {/* )} */}
      {/* {mode !== 'text' && (
        <BregChatVoice
          mode={mode}
          loading={loading}
          messages={messages}
          sendMessage={sendMessage}
          onInputFocus={onInputFocus}
          switchToVoice={switchToVoice}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    ...StyleSheet.absoluteFillObject,
  },
  flex: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20,
  },
  input: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default BregChat;
