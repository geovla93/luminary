import {useCreateTransaction} from '@hooks/useCreateTransaction';
import {Button, Typography} from '@ui/core/components';
import SquareButton from '@ui/core/components/SquareButton';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

const TransferStatus = () => {
  const {cancelTransfer} = useCreateTransaction();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <View style={styles.header}>
          <SquareButton icon="close" onPress={() => cancelTransfer()} />
        </View>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="contain"
            source={require('@assets/transaction-bg.png')}
            style={styles.background}>
            <Image
              resizeMethod="auto"
              style={{width: 100, height: 100}}
              resizeMode="cover"
              source={require('@assets/ilumi.png')}
            />
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <Typography variant="titleMedium">Congratulations</Typography>
          <Typography variant="titleMedium" sx={{marginTop: 10}}>
            You have successfully sent 0.1 BTC
          </Typography>
        </View>
        <Button
          size="medium"
          sx={{margin: 20}}
          variant="contained"
          onPress={() => {}}>
          View Transaction
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default TransferStatus;
