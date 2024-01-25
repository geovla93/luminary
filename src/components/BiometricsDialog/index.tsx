import React from 'react';
import {Button, Typography} from '@ui/core/components';
import {Image} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';

interface IProps {
  onSet: (status: boolean) => void;
}

const BiometricsDialog = ({onSet}: IProps) => {
  const {formatMessage} = useIntl();
  return (
    <Portal>
      <Dialog
        style={{
          borderRadius: 20,
          backgroundColor: colors.background,
        }}
        visible={true}>
        <Image
          source={require('@assets/biometrics.png')}
          style={{
            width: 80,
            height: 80,
            alignSelf: 'center',
            marginVertical: 20,
          }}
        />
        <Dialog.Content>
          <Typography
            variant="bodyLarge"
            fontWeight="500"
            textAlign="center"
            mt={10}>
            {formatMessage({id: 'biometrics_title'})}
          </Typography>
        </Dialog.Content>
        <Dialog.Actions
          style={{justifyContent: 'space-around', flexDirection: 'column'}}>
          <Button
            size="small"
            sx={{width: '100%', marginBottom: 10}}
            onPress={() => onSet(true)}>
            {formatMessage({id: 'use_biometrics'})}
          </Button>
          <Button
            size="small"
            buttonColor={colors.surface}
            textColor={colors.onBackground}
            onPress={() => onSet(false)}>
            {formatMessage({id: 'use_pin'})}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default BiometricsDialog;
