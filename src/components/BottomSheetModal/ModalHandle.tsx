import {View} from 'react-native';
import SquareButton from 'src/ui/core/components/SquareButton';
import React from 'react';
import {Text} from 'react-native-paper';
import {colors} from '@ui/core/theme';

const ModalHandle = ({closeAction}: {closeAction: () => void}) => {
  return (
    <View
      style={{
        backgroundColor: colors.inverseOnSurface,
        paddingVertical: 13,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
        shadowColor: 'black',
        shadowOffset: {height: -3, width: 3},
        shadowRadius: 3,
        shadowOpacity: 0.3,
      }}>
      <Text
        variant={'titleLarge'}
        style={{
          textAlign: 'center',
          width: '90%',
          fontFamily: 'Roboto-Medium',
          fontWeight: '500',
          fontSize: 22,
        }}>
        Select a network
      </Text>
      <SquareButton onPress={closeAction} />
    </View>
  );
};

export default ModalHandle;
