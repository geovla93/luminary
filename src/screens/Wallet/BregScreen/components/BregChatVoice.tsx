import React, {useEffect, useRef, useState} from 'react';

import {
  Alert,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import BregNoMessages from './BregNoMessages';
import BregChatMessages from './BregChatMessages';
import {IconButton} from 'react-native-paper';
import {IMessage} from '@itypes/breg';
import MicrophoneIcon from '@ui/core/Icons/MicrophoneIcon';
import BregVoiceAnimation from './BregVoiceAnimation';
import Voice from '@react-native-community/voice';
import {Typography} from '@ui/core/components';

const BregChatVoice = ({
  mode,
  loading,
  messages,
  sendMessage,
  onInputFocus,
  switchToVoice,
}: {
  mode: 'text' | 'audio' | null;
  loading: boolean;
  messages: IMessage[];
  sendMessage: () => void;
  onInputFocus: () => void;
  switchToVoice: () => void;
}) => {
  // const {formatMessage} = useIntl();
  const [transcript, setResult] = React.useState<string>('');
  const [state, setState] = useState<
    'thinking' | 'speaking' | 'listening' | 'paused'
  >('paused');

  useEffect(() => {
    Voice.onSpeechStart = e => onSpeechStartHandler(e);
    Voice.onSpeechEnd = e => onSpeechEndHandler(e);
    Voice.onSpeechResults = e => onSpeechResultsHandler(e);

    return () => {
      Voice.removeAllListeners();
    };
  }, []);

  const onSpeechStartHandler = (e: any) => {
    setState('speaking');
    console.log('onSpeechStartHandler', e);
  };

  const onSpeechEndHandler = (e: any) => {
    setState('paused');
    console.log('onSpeechEndHandler', e);
  };

  const onSpeechResultsHandler = (e: any) => {
    console.log(e.value);
    setResult(e.value[0]);
  };

  return (
    <View style={{flex: 1}}>
      <BregVoiceAnimation state={state} setState={() => Voice.start('en-US')} />
      <View style={{marginHorizontal: 20}}>
        <Typography color="#fff">{transcript}</Typography>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => console.log('start chat')}
          style={{marginTop: 20}}>
          <ImageBackground
            source={require('@assets/breg_button.png')}
            style={styles.startChatButton}>
            <MicrophoneIcon />
          </ImageBackground>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
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

export default BregChatVoice;
