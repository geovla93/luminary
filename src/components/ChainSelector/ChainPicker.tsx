import React, {useMemo, useCallback, useEffect, useState} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import {useWalletContext} from '@hooks/useWalletContext';

import ChainItem from './ChainItem';
import {IBlockchain} from '@itypes/blockchain';
import {useIntl} from 'react-intl';

import {colors} from '@ui/core/theme';
import HeaderComponent from '@components/HeaderComponent';

interface IChainPicker {
  bottomSheetRef: any;
  onPress: (chain: IBlockchain) => void;
  onClose: () => void;
}

const ChainPicker = ({bottomSheetRef, onPress, onClose}: IChainPicker) => {
  const {formatMessage} = useIntl();
  const {chains} = useWalletContext();
  const [search, setSearch] = useState('');
  const [currentWalletChains, setCurrentWalletChains] = useState<IBlockchain[]>(
    [],
  );
  useEffect(() => {
    setCurrentWalletChains(chains);
  }, [chains]);

  useEffect(() => {
    if (search) {
      setCurrentWalletChains(
        chains.filter((chain: IBlockchain) => chain.name.includes(search)),
      );
    } else {
      setCurrentWalletChains(chains);
    }
  }, [search]);

  // variables
  const snapPoints = useMemo(() => ['90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((_index: number) => {}, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      handleStyle={styles.handle}
      backgroundStyle={styles.content}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <HeaderComponent title="select_chain" onClose={() => onClose()} />
      <BottomSheetTextInput
        placeholder={formatMessage({id: 'search_chain'})}
        value={search}
        onChangeText={(value: string) => setSearch(value)}
        style={styles.input}
        placeholderTextColor={colors.primary}
        focusable
      />
      <BottomSheetFlatList
        data={currentWalletChains}
        renderItem={item => {
          return (
            <ChainItem
              item={item.item}
              onPress={(_chain: IBlockchain) => onPress(_chain)}
            />
          );
        }}
        contentContainerStyle={styles.contentContainer}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#1E1B16',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
  },
  chainImage: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'center',
  },
  handle: {
    display: 'none',
  },
  input: {
    backgroundColor: '#2D2A24',
    borderRadius: 15,
    marginHorizontal: 20,
    fontSize: 18,
    marginVertical: 10,
    height: 50,
    paddingHorizontal: 20,
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});

export default ChainPicker;
