import React from 'react';
import {useNavigation} from '@react-navigation/native';
import SquareButton from 'src/ui/core/components/SquareButton';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import TokenInfo from './components/TokenInfo';
import TokenActions from './components/TokenActions';
import TokenChart from './components/TokenChart';
import AboutToken from './components/About';
import {TabBar, TabBarProps, TabView} from 'react-native-tab-view';
import {useIntl} from 'react-intl';
import {colors} from '@ui/core/theme';
import TabViewTabIndicator from '@ui/core/components/TabViewTabIndicator';

const TokenScreen = ({route}: any) => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  const {token} = route.params;
  const renderTabBar = (props: TabBarProps<any>) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      renderIndicator={indicatorProps => (
        <TabViewTabIndicator {...indicatorProps} />
      )}
      style={{backgroundColor: 'transparent', marginBottom: 10}}
    />
  );

  const renderScene = (props: any) => {
    switch (props.route.key) {
      case 'overview':
        return <TokenChart token={token} />;
      case 'about':
        return <AboutToken token={token} />;
      default:
        return null;
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'overview', title: formatMessage({id: 'overview'})},
    {key: 'about', title: formatMessage({id: 'about'})},
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <SquareButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.tokenPrice}>
        <TokenInfo token={token} />
        <TokenActions />
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tabsContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: colors.primary,
    width: 60,
    height: 1,
    borderRadius: 0,
    marginBottom: 0,
    marginTop: 25,
  },
  tokenPrice: {
    marginHorizontal: 10,
  },
});

export default TokenScreen;
