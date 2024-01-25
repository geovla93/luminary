import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import initialMessages from './messages';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
} from './MessageContainer';
import {colors} from '@ui/core/theme';
import {View} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
import {Typography} from '@ui/core/components';
import {useNavigation} from '@react-navigation/native';

const Chats = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <SquareButton onPress={() => navigation.goBack()} />
        <View>
          <Typography variant={'titleMedium'}>Aaron</Typography>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={setText}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'Aaron',
          avatar: 'https://placeimg.com/150/150/any',
        }}
        alignTop
        alwaysShowSend
        scrollToBottom
        // showUserAvatar
        renderAvatarOnTop
        renderUsernameOnMessage
        bottomOffset={26}
        onPressAvatar={console.log}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        // renderMessageText={renderMessageText}
        // renderMessageImage
        // renderCustomView={renderCustomView}
        isCustomViewBottom={false}
        messagesContainerStyle={{
          backgroundColor: colors.inverseOnSurface,
          borderColor: 'red',
        }}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
      />
    </View>
  );
};

export default Chats;
