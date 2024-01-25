import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Typography} from '@ui/core/components';
import SquareButton from '@ui/core/components/SquareButton';
import Input from '@ui/core/components/Input';
import {useNavigation} from '@react-navigation/native';
// import useTokens from '@hooks/useTokens';

interface INavigation {
  navigate: (screen: string) => void;
  goBack: () => void;
}

const ManageTokensScreen = () => {
  const navigation = useNavigation<INavigation>();
  const [search, setSearch] = useState('');
  const {formatMessage} = useIntl();
  // const {tokens} = useTokens();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View />
          <Typography fontWeight="bold" variant="headlineSmall">
            {formatMessage({id: 'manage_tokens_title'})}
          </Typography>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.searchContainer}>
          <Input
            placeholder={formatMessage({id: 'search_tokens'})}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            left={<Input.Icon icon="magnify" />}
            right={
              search && (
                <Input.Icon icon="close" onPress={() => setSearch('')} />
              )
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    marginTop: 10,
  },
});

export default ManageTokensScreen;
