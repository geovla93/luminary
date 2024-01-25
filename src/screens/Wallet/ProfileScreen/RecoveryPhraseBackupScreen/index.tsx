import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import SquareButton from '@ui/core/components/SquareButton';
import {useNavigation} from '@react-navigation/native';
import {Button, Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';
import useCloudBackup from '@hooks/useCloudBackup';
import {useTemporaryWallet} from '@hooks/useTemporaryWallet';

const RecoveryPhraseBackupScreen = () => {
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  const {getSeedPhrase, mode} = useTemporaryWallet();
  const {
    writeFileToCloud,
    loading,
    isIcloudAvailable,
    readFile,
    stats,
    fileContents,
  } = useCloudBackup('/security_backup.txt');

  const securityPhrase = getSeedPhrase?.();
  console.log(mode);
  const readFileFromCloud = async () => {
    await readFile();
    console.log('content', fileContents);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="titleMedium" sx={styles.headerText}>
            {formatMessage({id: 'recovery_phrase_backup'})}
          </Typography>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
        <View style={styles.content}>
          {!isIcloudAvailable ? (
            <View>
              <View style={{paddingVertical: 20}}>
                <Typography variant="bodyMedium">
                  {formatMessage({id: 'backup_stats'})}
                </Typography>
                <Typography variant={'bodySmall'}>
                  {stats?.mtime.toUTCString()}
                </Typography>
              </View>
              <Button
                variant={'contained'}
                size={'small'}
                disabled={loading}
                onPress={() => {
                  writeFileToCloud(securityPhrase);
                }}>
                Create backup
              </Button>
              {/*<Button*/}
              {/*  size={'small'}*/}
              {/*  variant={'outlined'}*/}
              {/*  onPress={readFileFromCloud}>*/}
              {/*  Read file*/}
              {/*</Button>*/}
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant="bodyMedium">
                {formatMessage({id: 'icloud_not_available'})}
              </Typography>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecoveryPhraseBackupScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  content: {
    marginTop: 20,
    flex: 1,
  },
});
