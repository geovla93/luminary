import React, {useRef} from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
// import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import BregNoMessages from './BregNoMessages';
import BregChatMessages from './BregChatMessages';
import {IconButton} from 'react-native-paper';
import {IMessage} from '@itypes/breg';

const BregChatText = ({
  // mode,
  loading,
  messages,
  message,
  flatListRef,
  setMessage,
  sendMessage,
  onInputFocus,
}: // switchToVoice,
{
  // mode: 'text' | 'audio' | null;
  loading: boolean;
  messages: IMessage[];
  message: string;
  flatListRef: any;
  setMessage: (message: string) => void;
  sendMessage: () => void;
  onInputFocus: () => void;
  // switchToVoice: () => void;
}) => {
  const {formatMessage} = useIntl();

  return (
    <View style={{flex: 1}}>
      {messages.length === 0 && <BregNoMessages />}
      {messages.length > 0 && (
        <BregChatMessages
          flatListRef={flatListRef}
          loading={loading}
          messages={messages}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          onChange={e => setMessage(e.nativeEvent.text)}
          value={message}
          placeholderTextColor={colors.primary}
          onSubmitEditing={() => {
            if (!loading) {
              sendMessage();
            }
          }}
          onFocus={onInputFocus}
          placeholder={formatMessage({
            id: 'type_your_message',
          })}
          style={[styles.input, {width: '80%'}]}
        />

        <IconButton
          icon={loading ? 'circle' : 'arrow-up'}
          containerColor={loading ? colors.backdrop : colors.primary}
          disabled={loading}
          iconColor="black"
          size={30}
          onPress={() => message && sendMessage()}
        />
      </View>

      {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => console.log('start chat')}
            style={{marginTop: 20}}>
            <ImageBackground
              source={require('@assets/breg_button.png')}
              style={styles.startChatButton}>
              <MicrophoneIcon />
            </ImageBackground>
          </TouchableOpacity>
        </View> */}
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

export default BregChatText;
