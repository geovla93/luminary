import React, {useEffect, useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import HandleComponent from '@components/BottomSheetHandler';
import {Divider} from 'react-native-paper';
import {SCREENS} from '@screens/screens';
import {useNavigation} from '@react-navigation/native';
import {useOnboarding} from '@hooks/useOnboarding';
import {colors} from '@ui/core/theme';

interface IProps {
  bottomSheetRef: any;
  onClose: () => void;
}

const AskForBackup = ({bottomSheetRef, onClose}: IProps) => {
  const {formatMessage} = useIntl();
  const {playAudioFile} = useOnboarding();
  const navigation = useNavigation<any>();
  const snapPoints = useMemo(() => ['50%', '60%'], []);

  useEffect(() => {
    playAudioFile('backup', false, true);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={() => (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      index={0}
      handleComponent={() => (
        <HandleComponent
          title={formatMessage({id: 'backup_your_wallet'})}
          onClose={onClose}
        />
      )}
      backgroundStyle={styles.content}
      handleStyle={styles.handle}>
      <BottomSheetScrollView style={styles.btshView}>
        <View style={{flex: 1, marginBottom: 40}}>
          <View style={{flex: 1}}>
            <Divider />
            <Image
              source={require('@assets/locked.png')}
              style={styles.image}
            />
            <Typography
              fontWeight="bold"
              variant="titleMedium"
              pt={20}
              pb={20}
              textAlign="center">
              {formatMessage({id: 'backup_your_wallet_description'})}
            </Typography>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate(SCREENS.APP_BACKUP_WALLET_SCREEN_ROOT);
              onClose();
            }}>
            <Typography color={colors.background} fontWeight="600">
              {formatMessage({id: 'backup_now'})}
            </Typography>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handle: {
    display: 'none',
  },
  btshView: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 20,
    // justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  content: {
    backgroundColor: colors.surface,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default AskForBackup;
