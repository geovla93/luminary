// import {Typography} from '@ui/core/components';
import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import DappSearch from './components/DappSearch';
import DappsSlider from '@components/DappsSlider';
import useDapps from '@hooks/useDapps';
import DappsSection from './components/DappsSection';
import DappList from './components/DappList';
import {Typography} from '@ui/core/components';
import {IDapp} from '@itypes/dapps';

const DappsScreen = () => {
  const {formatMessage} = useIntl();
  const [search, setSearch] = useState('');
  const {featured, hot, dapps, openDapp} = useDapps();
  const [_renderDapps, setRenderDapps] = useState<IDapp[]>([]);

  useEffect(() => {
    if (search) {
      setRenderDapps(
        dapps.filter((dapp: IDapp) =>
          dapp.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setRenderDapps(dapps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, dapps]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <View style={styles.screenTitle}>
          <DappSearch search={search} setSearch={setSearch} />
          {!search && (
            <Typography variant="headlineMedium">
              {formatMessage({id: 'dapps_title'})}
            </Typography>
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {!search && (
            <>
              <DappsSlider items={featured} openDapp={openDapp} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
