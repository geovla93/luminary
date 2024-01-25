import React from 'react';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';

const WebScreen = ({route}: any) => {
  console.log('WebScreen', route.params.visit);

  return (
    <View>
      <Text>WebScreen</Text>
      <WebView
        source={{uri: route.params.visit}}
        allowsBackForwardNavigationGestures
        originWhitelist={['*']}
        sharedCookiesEnabled
        scalesPageToFit
        javaScriptEnabled={true}
        style={{
          marginTop: 20,
          width: '100%',
          height: 500,
          backgroundColor: 'red',
        }}
        containerStyle={{width: '100%', height: 500, backgroundColor: 'red'}}
      />
    </View>
  );
};

export default WebScreen;
