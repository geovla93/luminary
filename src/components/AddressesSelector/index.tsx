import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import AddressItem from './AddressItem';
import {Divider} from 'react-native-paper';
import Pagination from '@components/Pagination';
import {IWalletAddresses} from '@itypes/wallet';

import {Button, Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

interface IProps {
  addresses: IWalletAddresses[];
  perPage: number;
  currentPage: number;
  selected: string;
  mode: string;
  onModeToggle: () => void;
  onSelect: (path: string) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const AddressSelector = ({
  addresses,
  perPage,
  currentPage,
  selected,
  mode,
  onModeToggle,
  onSelect,
  handleNext,
  handleBack,
}: IProps) => {
  const {formatMessage} = useIntl();
  return (
    <>
      <View style={styles.root}>
        <FlatList
          data={addresses}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item, index}) => (
            <AddressItem
              data={item}
              index={index}
              onSelect={onSelect}
              selected={selected === item.derivationPath}
              perPage={perPage}
              currentPage={currentPage}
            />
          )}
          ListFooterComponent={() => {
            if (addresses.length > 0 && mode === 'advanced') {
              return (
                <Pagination
                  currentPage={currentPage}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              );
            }
          }}
          keyExtractor={(_item, index) => `address-${index}`}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1B16',
    padding: 10,
    borderRadius: 10,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingBottom: 10,
  },
});

export default AddressSelector;
