import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useIntl} from 'react-intl';
import {IconButton} from 'react-native-paper';

import TextField from '@ui/core/components/TextField';
import ProfileCard from '@components/ProfileCard';
import NewsSlider from '@components/NewsSlider';
import useNews from '@hooks/useNews';
import {colors} from '@ui/core/theme';

import {useAssetsToolbox} from '@components/TokenToolbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TakeActionComponent from '@screens/Wallet/HomeScreen/components/TakeActionComponent';

const PortfolioSummary = ({search, setSearch}: any) => {
  const {formatMessage} = useIntl();
  const {setShowTokenToolbox} = useAssetsToolbox();
  const {featured} = useNews();

  return (
    <View>
      {!search && (
        <>
          <ProfileCard />
          {featured.length > 0 && <NewsSlider items={featured} />}
        </>
      )}
      <TakeActionComponent />
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.searchContainer}>
            <TextField
              left={() => (
                <Icon
                  name="magnify"
                  color="#fff"
                  size={22}
                  style={{alignSelf: 'center', marginLeft: 10}}
                />
              )}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor={'#49454F'}
              sx={{color: colors.primary}}
              placeholder={formatMessage({id: 'search'})}
              value={search}
              onChangeText={(value: string) => setSearch(value)}
            />
          </View>
          <IconButton
            onPress={() => setShowTokenToolbox(true)}
            icon="dots-vertical"
            style={styles.more}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderRadius: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  content: {
    marginTop: 10,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  more: {
    backgroundColor: '#1E1C1A',
    borderRadius: 15,
  },
});

export default PortfolioSummary;
