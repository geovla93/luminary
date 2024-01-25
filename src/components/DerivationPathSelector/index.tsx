import React, {useMemo} from 'react';
import {Typography} from '@ui/core/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import derivationPaths from 'src/blockchain/derivationPath';
import DerivationPathInput from './DerivationPathInput';
import {useIntl} from 'react-intl';

interface IProps {
  selected: number;
  openPathsModal: () => void;
  onChange: (value: string) => void;
}

const DerivationPathSelector = ({
  selected,
  onChange,
  openPathsModal,
}: IProps) => {
  const {formatMessage} = useIntl();
  const selectedPath = useMemo(() => {
    return derivationPaths[selected];
  }, [selected]);

  return (
    <View style={styles.root}>
      <View style={styles.section}>
        <View style={styles.label}>
          <Typography variant="bodySmall">
            {formatMessage({id: 'derivation_path_type'})}
          </Typography>
        </View>
        <TouchableOpacity onPress={openPathsModal} style={styles.content}>
          <Typography variant="bodySmall">{selectedPath.name}</Typography>
          <Icon name="chevron-right" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={styles.section}>
        <View style={styles.label}>
          <Typography variant="bodySmall">
            {formatMessage({id: 'derivation_path_index'})}
          </Typography>
        </View>
        <View style={styles.content}>
          <DerivationPathInput
            derivationPath={selectedPath}
            onChange={onChange}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1E1B16',
    padding: 10,
    borderRadius: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    flex: 1,
    flexGrow: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DerivationPathSelector;
