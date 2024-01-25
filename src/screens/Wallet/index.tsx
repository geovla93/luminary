/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import NewsScreen from './NewsScreen';
// import LearnScreen from './LearnScreen';
import EarnScreen from './EarnScreen';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ILuminaryIcon from '@ui/core/Icons/iLuminaryIcon';
import {useTheme} from 'react-native-paper';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useIntl} from 'react-intl';
import AnimatedTabBarButton from '@components/AnimatedTabBarButton';
import DappsScreen from './DappsScreen';
import BregWidget from './BregScreen';
import WalletIcon from '@ui/core/Icons/WalletIcon';
import DappsIcon from '@ui/core/Icons/DappsIcon';
import NewsIcon from '@ui/core/Icons/NewsIcon';
import LearnIcon from '@ui/core/Icons/LearIcon';
import {colors} from '@ui/core/theme';
import EliteCircleScreen from './EliteCircleScreen';
import AssetsToolboxProvider from '@components/TokenToolbox';
// import ILuminaryIcon from '@ui/core/Icons/iLuminaryIcon';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#101728',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Earn" component={EarnScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigator = () => {
  const theme = useTheme();
  const [isBregVisible, setIsBregVisible] = useState(false);
  const {formatMessage} = useIntl();
  const toggleBreg = () => {
    setIsBregVisible(!isBregVisible);
  };
  return (
    <BottomSheetModalProvider>
      <AssetsToolboxProvider>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#f8d949',
            tabBarActiveBackgroundColor: theme.colors.surfaceVariant,
            tabBarInactiveTintColor: '#fff',
            tabBarInactiveBackgroundColor: theme.colors.surfaceVariant,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              backgroundColor: theme.colors.surfaceVariant,
              borderTopColor: theme.colors.surfaceVariant,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '300',
            },
          }}>
          <Tab.Screen
            name="Home Stack"
            options={{
              tabBarLabel: formatMessage({id: 'wallet_tab'}),
              tabBarIcon: ({color, size, focused}) => (
                <AnimatedTabBarButton name="assets" focused={focused}>
                  <WalletIcon color={color} width={size} height={size} />
                </AnimatedTabBarButton>
              ),
            }}
            component={HomeStackScreen}
          />
          <Tab.Screen
            name="Dapps"
            options={{
              tabBarLabel: formatMessage({id: 'dapps_tab'}),
              tabBarIcon: ({color, size, focused}) => (
                <AnimatedTabBarButton name="Dapps" focused={focused}>
                  <DappsIcon color={color} width={size} height={size} />
                </AnimatedTabBarButton>
              ),
            }}
            component={DappsScreen}
          />
          <Tab.Screen
            name="Wallet"
            listeners={{
              tabPress: e => {
                e.preventDefault();
                setIsBregVisible(true);
              },
            }}
            options={{
              tabBarLabel: 'Wallet',
              tabBarLabelStyle: {
                display: 'none',
              },
              tabBarIcon: () => (
                <View style={styles.breg}>
                  <View
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderRadius: 111,
                    }}>
                    <ILuminaryIcon size={45} />
                  </View>
                </View>
              ),
            }}
            //@ts-ignore
            component={BregWidget}
          />
          <Tab.Screen
            name="News"
            options={{
              tabBarLabel: formatMessage({id: 'news_tab'}),

              tabBarIcon: ({color, size, focused}) => (
                <AnimatedTabBarButton name="News" focused={focused}>
                  <NewsIcon color={color} width={size} height={size} />
                </AnimatedTabBarButton>
              ),
            }}
            component={NewsScreen}
          />

          <Tab.Screen
            name="EliteCircle"
            options={{
              tabBarLabel: formatMessage({id: 'community_tab'}),
              tabBarIcon: ({color, size, focused}) => (
                <AnimatedTabBarButton name="EliteCircle" focused={focused}>
                  <LearnIcon color={color} width={size} height={size} />
                </AnimatedTabBarButton>
              ),
            }}
            component={EliteCircleScreen}
          />
        </Tab.Navigator>
        {isBregVisible && <BregWidget onClose={toggleBreg} />}
      </AssetsToolboxProvider>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  breg: {
    position: 'absolute',
    top: -15,
    width: 60,
    height: 60,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 111,
    zIndex: 111,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigator;
