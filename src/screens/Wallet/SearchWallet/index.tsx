import {useCreateTransaction} from '@hooks/useCreateTransaction';
import {Typography} from '@ui/core/components';
import React from 'react';
import {useIntl} from 'react-intl';
import {View, StyleSheet, Keyboard} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchWallet = ({
  address,
  onAddressChange,
}: {
  address: string;
  onAddressChange: (value: string) => void;
}) => {
  const {formatMessage} = useIntl();
  const {chain} = useCreateTransaction();

  return (
    <>
      <View style={styles.root}>
        <TextInput
          left={
            <TextInput.Icon style={styles.icon} icon="magnify" color="#fff" />
          }
          right={
            <TextInput.Icon
              style={styles.icon}
              icon="qrcode-scan"
              color="#fff"
            />
          }
          value={address}
          onChangeText={onAddressChange}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          mode="flat"
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          placeholder={formatMessage({id: 'search_contact_or_address'})}
          contentStyle={styles.input}
          style={styles.inputContainer}
        />
      </View>
      <View style={styles.info}>
        <Icon
          style={{marginLeft: 20}}
          name="information-outline"
          size={16}
          color="#fff"
        />
        <Typography variant="labelSmall" sx={{paddingRight: 10}} color="#fff">
          {formatMessage(
            {id: 'select_wallet_info'},
            {
              name: chain?.name,
            },
          )}
        </Typography>
      </View>
    </>
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    overflow: 'hidden',
    marginTop: 10,
    borderColor: '#221F1A',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
  },
});

export default SearchWallet;
