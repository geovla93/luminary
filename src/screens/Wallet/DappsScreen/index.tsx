import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import DappSearch from './components/DappSearch';
import DappsSlider from '@components/DappsSlider';
import useDapps from '@hooks/useDapps';
import DappsSection from './components/DappsSection';
import DappList from './components/DappList';
import {IDapp} from '@itypes/dapps';

const DappsScreen = () => {
  const {formatMessage} = useIntl();
  const [search, setSearch] = useState('');
  const {featured, hot, dapps, openDapp} = useDapps();
  const [_renderDapps, setRenderDapps] = useState<IDapp[]>([]);

  useEffect(() => {
    if (search && dapps) {
      setRenderDapps(
        dapps?.filter((dapp: IDapp) =>
          dapp.name?.toLowerCase()?.includes(search?.toLowerCase()),
        ),
      );
    } else {
      setRenderDapps(dapps);
    }
  }, [search, dapps]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : undefined}>
        <View style={styles.root}>
          <View style={styles.screenTitle}>
            <DappSearch search={search} setSearch={setSearch} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.content}>
            {!search && (
              <>
                {featured && (
                  <DappsSlider items={featured} openDapp={openDapp} />
                )}
                <DappsSection
                  title={formatMessage({id: 'hot_dapps'})}
                  items={hot}
                  openDapp={openDapp}
                />
              </>
            )}
            <DappList items={_renderDapps} openDapp={openDapp} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  screenTitle: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  content: {},
});

export default DappsScreen;
