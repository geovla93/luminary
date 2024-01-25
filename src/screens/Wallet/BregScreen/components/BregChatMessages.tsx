import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import RenderMessage from './RenderMessage';

const BregChatMessages = ({
  messages,
}: {
  messages: Array<{text: string; kind: string; type: string}>;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => <RenderMessage message={item} />}
        keyExtractor={(item, index) => `message-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
  },
});

export default BregChatMessages;
