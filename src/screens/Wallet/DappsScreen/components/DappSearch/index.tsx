import React from 'react';
import {useIntl} from 'react-intl';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const DappSearch = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.header}>
      <TextInput
        left={<TextInput.Icon icon="magnify" />}
        right={
          search && (
            <TextInput.Icon icon="close" onPress={() => setSearch('')} />
          )
        }
        onChangeText={text => setSearch(text)}
        style={styles.searchInput}
        value={search}
        placeholder={formatMessage({id: 'search_dapps'})}
        mode="outlined"
        outlineStyle={{borderRadius: 40}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  screenTitle: {},
  searchInput: {
    flex: 1,
    height: 40,

    marginBottom: 16,
    borderRadius: 15,
    fontSize: 14,
    color: 'rgba(255, 255, 255, .1)',
  },
});

export default DappSearch;
