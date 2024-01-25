import React, {useEffect, useRef} from 'react';
import {Animated, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '@ui/core/theme';
import {List} from 'react-native-paper';
import EarlyAccess from '@ui/core/Icons/EarlyAccess';
import ZeroFee from '@ui/core/Icons/ZeroFee';
import PrioritySupport from '@ui/core/Icons/PrioritySupport';
import ExclusiveEvents from '@ui/core/Icons/ExclusiveEvents';
import CommunityInfluence from '@ui/core/Icons/CommunityInfluence';
import UniqueRewards from '@ui/core/Icons/UniqueRewards';
import {useIntl} from 'react-intl';

const Icon = ({children}: {children: React.ReactNode}) => {
  return (
    <Animated.View style={[styles.iconContainer]}>{children}</Animated.View>
  );
};

const EliteCircleScreen = () => {
  const {formatMessage} = useIntl();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(
    new Array(6).fill(null).map(() => new Animated.Value(100)),
  ).current;
  const imageScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const startTranslateAnimation = () => {
    translateAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 800,
        delay: index * 100, // slight delay between each item
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    startPulseAnimation();
    startTranslateAnimation();
  }, []);

  const featureList = [
    {
      title: 'early_access',
      description: 'early_access_description',
      icon: <EarlyAccess width={24} height={24} />,
    },
    {
      title: 'zero_fee',
      description: 'zero_fee_description',
      icon: <ZeroFee width={24} height={24} />,
    },
    {
      title: 'priority_support',
      description: 'priority_support_description',
      icon: <PrioritySupport width={24} height={24} />,
    },
    {
      title: 'exclusive_events',
      description: 'exclusive_events_description',
      icon: <ExclusiveEvents width={24} height={24} />,
    },
    {
      title: 'community_influence',
      description: 'community_influence_description',
      icon: <CommunityInfluence width={24} height={24} />,
    },
    {
      title: 'unique_rewards',
      description: 'unique_rewards_description',
      icon: <UniqueRewards width={24} height={24} />,
    },
  ];
  return (
    <SafeAreaView style={styles.root}>
      <Animated.ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <Animated.Image
          style={[styles.image, {transform: [{scale: imageScale}]}]}
          source={require('./components/image.png')}
        />
        <Animated.Text
          style={[
            styles.comingSoon,
            {
              transform: [{scale: pulseAnim}],
            },
          ]}>
          {formatMessage({id: 'coming_soon'})}
        </Animated.Text>
        <List.Section style={styles.listContainerStyle}>
          {featureList.map((item, index) => (
            <Animated.View
              key={`${index}-info`}
              style={{transform: [{translateX: translateAnim[index]}]}}>
              <List.Item
                title={formatMessage({id: item.title})}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={3}
                descriptionEllipsizeMode="tail"
                description={formatMessage({id: item.description})}
                left={() => <Icon>{item.icon}</Icon>}
              />
            </Animated.View>
          ))}
        </List.Section>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  listTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  listDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  comingSoon: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  image: {
    alignSelf: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#3C3933',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainerStyle: {
    marginBottom: 40,
  },
});

export default EliteCircleScreen;
