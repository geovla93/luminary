import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import RenderMessage from './RenderMessage';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={styles.bregIsThinking}>
      <LottieView
        autoPlay
        loop
        style={{width: 60, height: 30}}
        source={require('@assets/lottie/typing.json')}
      />
    </View>
  );
};

const BregChatMessages = ({
  messages,
  flatListRef,
  loading,
}: {
  messages: Array<{text: string; kind: string; type: string}>;
  flatListRef: any;
  loading: boolean;
}) => {
  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <RenderMessage message={item} />}
      keyExtractor={(_item, index) => `message-${index}`}
      ListFooterComponent={loading ? <Loading /> : null}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  bregIsThinking: {
    borderRadius: 20,
    paddingBottom: 10,
    backgroundColor: '#221F1A',
    alignSelf: 'flex-start',
  },
});

export default BregChatMessages;
