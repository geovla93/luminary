import React, {useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextField from '@ui/core/components/TextField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@ui/core/theme';
import useTokens from '@hooks/useTokens';
import {List, Divider, Switch} from 'react-native-paper';
import HeaderComponent from '@components/HeaderComponent';
// import useTokens from '@hooks/useTokens';

interface INavigation {
  navigate: (screen: string) => void;
  goBack: () => void;
}

const ManageTokensScreen = () => {
  const navigation = useNavigation<INavigation>();
  const timeout = useRef<NodeJS.Timeout>();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const {formatMessage} = useIntl();
  const {tokens, remoteSearchTokens, toggleTokenVisibility} = useTokens();

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = async (value: string) => {
    setSearch(value);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setIsLoading(true);
    timeout.current = setTimeout(() => {
      setIsLoading(false);
      remoteSearchTokens(value).then(res => {
        // if (value === '') {
        //   setResults([...tokens, ...res.data.data]);
        // } else {
        //   setResults(res.data.data);
        // }
        setResults(res.data.data);
      });
    }, 400);
  };
  const isActive = (item: any) => {
    // check if token exist in the list
    const isToken = tokens.find((token: any) => {
      return (
        token.contractAddress === item.contractAddress &&
        token.chainId === item.chainId &&
        item.id === token.id
      );
    });
    if (isToken && isToken.visible) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent
        title="manage_tokens_title"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <TextField
              left={() => (
                <Icon
                  name="magnify"
                  style={styles.searchIcon}
                  size={22}
                  color={colors.primary}
                />
              )}
              borderColor={colors.primary}
              right={() => {
                if (isLoading) {
                  return (
                    <ActivityIndicator
                      style={{marginRight: 15}}
                      size="small"
                      color={colors.primary}
                    />
                  );
                }
              }}
              placeholderTextColor={'#49454F'}
              autoCorrect={false}
              keyboardType="default"
              sx={styles.searchInput}
              placeholder={formatMessage({id: 'search_tokens'})}
              onChangeText={(_value: string) => {
                handleSearch(_value);
              }}
              value={search}
            />
          </View>
          <FlatList
            data={results}
            ItemSeparatorComponent={() => <Divider />}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <List.Item
                left={() => (
                  <View style={styles.listImageContainer}>
                    <Image
                      style={styles.coinImage}
                      source={{uri: item.image}}
                    />
                    <Image
                      style={styles.chainImage}
                      source={{uri: item.chainImage}}
                    />
                  </View>
                )}
                right={() => (
                  <Switch
                    value={isActive(item)}
                    onValueChange={() => toggleTokenVisibility(item)}
                  />
                )}
                title={item.name}
                description={item.symbol.toUpperCase()}
              />
            )}
            keyExtractor={(item, index) => item.id + '-' + index}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    marginTop: 20,
  },
  searchIcon: {
    marginLeft: 15,
  },
  searchInput: {color: colors.primary},
  listImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
    backgroundColor: '#2D2A24',
    padding: 5,
    borderRadius: 10,
  },
  coinImage: {width: 30, height: 30},
  chainImage: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: -5,
    bottom: -5,
    borderRadius: 20,
  },
});

export default ManageTokensScreen;
