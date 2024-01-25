import React from 'react';
import {View, StyleSheet} from 'react-native';

import PrivacyIcon from '@ui/core/Icons/PrivacyLock';
import SearchIcon from '@ui/core/Icons/SearchIcon';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import SvgIconBtn from '@ui/core/components/SvgIconBtn';
import {colors} from '@ui/core/theme';

const MessengerHeader = ({
  privacyAction,
  privacyActive,
}: {
  privacyAction: () => void;
  privacyActive: boolean;
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <View style={styles.backContainer}>
        <SquareButton onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.tools}>
        <SvgIconBtn style={{marginRight: 5}} icon={<SearchIcon size={20} />} />
        <SvgIconBtn
          icon={
            <PrivacyIcon
              size={20}
              color={privacyActive ? colors.primary : 'white'}
            />
          }
          onPress={privacyAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backContainer: {},
  tools: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MessengerHeader;
