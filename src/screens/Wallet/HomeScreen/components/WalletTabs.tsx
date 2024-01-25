import React from 'react';

import Portfolio from '@components/Portfolio';
import DigitalCollectibles from '@components/DigitalCollectibles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIntl} from 'react-intl';
import WalletTabBar from '@screens/Wallet/HomeScreen/components/WalletTabBar';

const WalletTabs = () => {
  const {formatMessage} = useIntl();
  const Tab = createMaterialTopTabNavigator();
  const renderTabBar = (props: any) => <WalletTabBar {...props} />;
  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen
        name={'assets'}
        component={Portfolio}
        options={{
          title: formatMessage({id: 'assets'}),
        }}
      />
      <Tab.Screen
        name={'digital_collectibles'}
        component={DigitalCollectibles}
        options={{
          title: formatMessage({id: 'digital_collectibles'}),
        }}
      />
    </Tab.Navigator>
  );
};

export default WalletTabs;
