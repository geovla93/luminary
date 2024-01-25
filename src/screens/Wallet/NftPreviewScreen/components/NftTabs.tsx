import React from 'react';
import {useWindowDimensions, View} from 'react-native';
// import {TabBar, TabBarProps, TabView} from 'react-native-tab-view';
import Tab from '@components/Tab';
// import {useIntl} from 'react-intl';
import Activity from '@screens/Wallet/NftPreviewScreen/components/Activity';
import Details from '@screens/Wallet/NftPreviewScreen/components/Details';
// import TabViewTabIndicator from '@ui/core/components/TabViewTabIndicator';
// import {colors} from '@ui/core/theme';

// @TODO add a proper type for nft
const NftTabs = ({nft}: {nft: any}) => {
  // const {formatMessage} = useIntl();
  const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   {key: 'details', title: formatMessage({id: 'details'})},
  //   {key: 'activity', title: formatMessage({id: 'activity'})},
  // ]);
  // const layout = useWindowDimensions();

  // const renderTabBar = (props: TabBarProps<any>) => (
  //   <TabBar
  //     {...props}
  //     scrollEnabled={true}
  //     renderIndicator={indicatorProps => (
  //       <TabViewTabIndicator
  //         indicatorStyle={{width: 50, marginLeft: 50}}
  //         {...indicatorProps}
  //       />
  //     )}
  //     style={{
  //       backgroundColor: colors.background,
  //       marginBottom: 10,
  //       paddingHorizontal: 30,
  //     }}
  //   />
  // );

  // const renderScene = (props: any) => {
  //   switch (props.route.key) {
  //     case 'details':
  //       return <Details nft={nft} />;
  //     case 'activity':
  //       return <Activity />;
  //     default:
  //       return <Details nft={nft} />;
  //   }
  // };

  return (
    <View style={{flex: 1, marginTop: 20, marginBottom: 30}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Tab
          active={index === 0}
          label={'details'}
          index={0}
          onPress={setIndex}
          labelStyle={{marginRight: 20}}
        />
        <Tab
          active={index === 1}
          label={'activity'}
          index={1}
          onPress={setIndex}
        />
      </View>
      <View style={{flex: 1, marginTop: 30}}>
        {index === 0 && <Details nft={nft} />}
        {index === 1 && <Activity />}
      </View>
    </View>
  );
};

export default NftTabs;
