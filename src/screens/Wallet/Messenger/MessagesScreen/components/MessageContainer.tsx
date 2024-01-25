import React from 'react';
import {View, Text} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from 'react-native-gifted-chat';
import {colors} from '@ui/core/theme';

export const renderAvatar = props => (
  <Avatar
    {...props}
    containerStyle={{left: {borderWidth: 0, borderColor: 'red'}, right: {}}}
    imageStyle={{
      left: {borderWidth: 1, borderColor: colors.primary},
      right: {},
    }}
  />
);

export const renderBubble = props => (
  <Bubble
    {...props}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}
    containerStyle={{
      left: {},
      right: {},
    }}
    wrapperStyle={{
      left: {
        backgroundColor: '#C9ECC8',
        paddingVertical: 2,
        paddingRight: 10,
        paddingLeft: 5,
      },
      right: {backgroundColor: colors.primary, padding: 10},
    }}
    bottomContainerStyle={{
      left: {},
      right: {},
    }}
    tickStyle={{backgroundColor: 'magenta'}}
    usernameStyle={{color: colors.background, fontWeight: '100'}}
    containerToNextStyle={{
      left: {backgroundColor: 'red'},
      right: {backgroundColor: 'red'},
    }}
    containerToPreviousStyle={{
      left: {backgroundColor: 'orange'},
      right: {backgroundColor: 'lime'},
    }}
  />
);

export const renderSystemMessage = props => (
  <SystemMessage
    {...props}
    containerStyle={{backgroundColor: colors.primary}}
    wrapperStyle={{paddingVertical: 5}}
    textStyle={{
      color: 'red',
      fontWeight: '600',
      fontFamily: 'Roboto-Medium',
    }}
  />
);

export const renderMessage = props => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    containerStyle={{
      left: {backgroundColor: 'transparent'},
      right: {backgroundColor: 'transparent'},
    }}
  />
);

export const renderMessageText = props => (
  <MessageText
    {...props}
    containerStyle={{
      left: {backgroundColor: colors.inverseOnSurface},
      right: {backgroundColor: colors.inverseOnSurface},
    }}
    textStyle={{
      left: {color: 'blue'},
      right: {color: 'red'},
    }}
    linkStyle={{
      left: {color: 'orange'},
      right: {color: 'orange'},
    }}
    customTextStyle={{fontSize: 24, lineHeight: 24}}
  />
);

export const renderCustomView = ({user}) => (
  <View style={{minHeight: 20, alignItems: 'center'}}>
    <Text>{user.name}</Text>
    <Text>From CustomView</Text>
  </View>
);
