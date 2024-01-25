import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function MyComponent() {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </SafeAreaProvider>
  );
}
