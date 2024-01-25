import React from 'react';

import {Dialog, Portal} from 'react-native-paper';
import {Typography, Button} from '@ui/core/components';
import {useIntl} from 'react-intl';

const DisconnectWallet = ({
  visible,
  hideDialog,
  onConfirm,
}: {
  visible: boolean;
  hideDialog: () => void;
  onConfirm: () => void;
}) => {
  const {formatMessage} = useIntl();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{textAlign: 'center'}}>
          {formatMessage({id: 'important'})}
        </Dialog.Title>
        <Dialog.Content>
          <Typography textAlign="center" variant="bodySmall">
            {formatMessage({id: 'important_info'})}
          </Typography>
          <Typography
            textAlign="center"
            variant="bodySmall"
            sx={{marginTop: 20}}>
            {formatMessage({id: 'important_info_2'})}
          </Typography>
        </Dialog.Content>
        <Dialog.Actions style={{justifyContent: 'space-between'}}>
          <Button
            sx={{paddingVertical: 0}}
            buttonColor="red"
            textColor="white"
            onPress={onConfirm}>
            {formatMessage({id: 'saved_phrase_confirm'})}
          </Button>
          <Button sx={{paddingVertical: 0}} variant="text" onPress={hideDialog}>
            {formatMessage({id: 'cancel'})}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DisconnectWallet;
