import React from 'react';
import {useIntl} from 'react-intl';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import BregAnimation from '@screens/Wallet/BregScreen/components/BregAnimation';
import {Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import BregAnimationSmall from '@screens/Wallet/BregScreen/components/BregAnimationSmall';
import SquareButton from '@ui/core/components/SquareButton';

const BregIntro = ({
  onClose,
  hideBregSplash,
}: {
  onClose: () => void;
  hideBregSplash: () => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <View style={styles.animationContainer}>
      <View style={styles.header}>
        <SquareButton icon="close" onPress={onClose} />
      </View>
      <BregAnimation />
      <View style={styles.content}>
        <Typography variant="headlineSmall" sx={{textAlign: 'center'}}>
          {formatMessage({id: 'meet_breg'})}
          <Typography
            variant="headlineSmall"
            fontWeight="bold"
            sx={{color: colors.primary}}>
            BREG
          </Typography>
        </Typography>
        <Typography variant="headlineSmall" sx={{marginTop: 10}}>
          {formatMessage({id: 'your_personal_assistant'})}
        </Typography>
        <Typography variant="bodySmall" sx={{marginTop: 20}}>
          {formatMessage({id: 'start_chatting'})}
        </Typography>
        <View>
          <Image
            source={require('@assets/breg/line.png')}
            style={{width: 2, height: 160}}
          />
        </View>
      </View>
      <View style={styles.bregActions}>
        <TouchableOpacity onPress={hideBregSplash}>
          <BregAnimationSmall />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BregIntro;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    // opacity: 0.9,
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  bregActions: {
    // position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
