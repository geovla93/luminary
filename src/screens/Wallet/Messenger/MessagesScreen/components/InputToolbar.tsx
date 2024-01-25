import React from 'react';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import SendMessage from '@ui/core/Icons/SendMessage';
import {colors} from '@ui/core/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';

export const renderInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: colors.inverseOnSurface,
      borderTopWidth: 0,
      height: 60,
    }}
    primaryStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
    }}
  />
);

export const renderActions = props => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
      backgroundColor: colors.inverseOnSurface,
    }}
    icon={() => <Icon name={'arrow-left'} size={24} color={'red'} />}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
    optionTintColor="red"
  />
);

export const renderComposer = props => (
  <Composer
    {...props}
    composerHeight={44}
    textInputStyle={{
      color: colors.primary,
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginLeft: 0,
      paddingTop: 5,
      paddingBottom: 5,
      lineHeight: 25,
    }}
  />
);

export const renderSend = props => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}>
    <SendMessage size={24} color={colors.primary} />
  </Send>
);
