import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Typography from '@ui/core/components/Typography';
import {useIntl} from 'react-intl';
import SvgIconBtn from '@ui/core/components/SvgIconBtn';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {TabBar, TabBarProps, TabView} from 'react-native-tab-view';
import TabViewTabIndicator from '@ui/core/components/TabViewTabIndicator';
import TabContent from '@screens/Wallet/LearnScreen/components/TabContent';

const courses = [
  {
    name: 'Bonus card',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
    price: '10,23 ILMT',
  },
  {
    name: 'Bonus card',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
    price: '5,23 ILMT',
  },
  {
    name: 'Bonus card',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
    price: '3,99 ILMT',
  },
  {
    name: 'Bonus card',
    image: 'https://i.imgur.com/UPrs1EWl.jpg',
    price: '4,00 ILMT',
  },
];

const LearnScreen = () => {
  const {formatMessage} = useIntl();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: formatMessage({id: 'overview'})},
    {key: 'fraud', title: formatMessage({id: 'fraud'})},
    {key: 'crypto', title: formatMessage({id: 'crypto'})},
  ]);

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

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'all':
        return (
          <TabContent
            courses={courses}
            titleSuggested={formatMessage({id: 'suggested'})}
            titleCourses={formatMessage({id: 'all_courses'})}
          />
        );
      case 'fraud':
        return (
          <TabContent
            courses={courses}
            titleSuggested={formatMessage({id: 'suggested'})}
            titleCourses={formatMessage({id: 'fraud'})}
          />
        );
      case 'crypto':
        return (
          <TabContent
            courses={courses}
            titleSuggested={formatMessage({id: 'suggested'})}
            titleCourses={formatMessage({id: 'crypto'})}
          />
        );
      default:
        return (
          <TabContent
            courses={courses}
            titleSuggested={formatMessage({id: 'suggested'})}
            titleCourses={formatMessage({id: 'all_courses'})}
          />
        );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Typography variant="titleLarge" sx={styles.screenTitle}>
            Learn
          </Typography>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexGrow: 0.25,
              marginRight: 0,
              justifyContent: 'space-between',
            }}>
            <SvgIconBtn
              onPress={() => console.log('asdasda')}
              icon={
                <Icon
                  name={'file'}
                  size={16}
                  style={{
                    color: '#fff',
                    paddingVertical: 0,
                    paddingHorizontal: 5,
                  }}
                />
              }
            />
            <SvgIconBtn
              onPress={() => console.log('asdasda')}
              style={{marginLeft: 5}}
              icon={
                <Icon
                  name={'gift'}
                  size={16}
                  style={{
                    color: '#fff',
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                  }}
                />
              }
            />
          </View>
        </View>
        <View style={styles.screenContent}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  tabsContainer: {
    height: 40,
    marginBottom: 0,
    flexDirection: 'row',
  },
  coursesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  screenContent: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  screenTitle: {
    fontWeight: '400',
    marginTop: 10,
    fontSize: 32,
    fontFamily: 'Roboto-Medium',
  },
  suggestedContent: {height: 285, paddingTop: 0},
  sectionTitle: {fontWeight: '700', fontFamily: 'Roboto-Bold', marginBottom: 0},
});
