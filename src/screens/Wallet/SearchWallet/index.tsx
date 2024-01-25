import React from 'react';
import {useIntl} from 'react-intl';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const SearchWallet = () => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.root}>
      <TextInput
        left={
          <TextInput.Icon style={styles.icon} icon="magnify" color="#fff" />
        }
        right={
          <TextInput.Icon style={styles.icon} icon="qrcode-scan" color="#fff" />
        }
        mode="flat"
        activeUnderlineColor="transparent"
        underlineColor="transparent"
        activeOutlineColor="transparent"
        placeholder={formatMessage({id: 'search_contact_or_address'})}
        contentStyle={styles.input}
        style={styles.inputContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    backgroundColor: '#221F1A',
    borderRadius: 30,
  },
  inputContainer: {
    backgroundColor: 'transparent',
  },
  icon: {
    marginTop: 20,
  },
  input: {
    borderRadius: 20,
    paddingVertical: 0,
    height: 70,
    backgroundColor: 'transparent',
    fontSize: 18,
  },
});

export default SearchWallet;
