import React, {useMemo, useCallback, useEffect, useState} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {View, StyleSheet} from 'react-native';
import {useWalletContext} from '@hooks/useWalletContext';

import SquareButton from '@ui/core/components/SquareButton';
import ChainItem from './ChainItem';
import {IBlockchain} from '@itypes/blockchain';

interface IChainPicker {
  bottomSheetRef: any;
  onPress: (chain: IBlockchain) => void;
  onClose: () => void;
}

const ChainPicker = ({bottomSheetRef, onPress, onClose}: IChainPicker) => {
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
        chains.filter((chain: IBlockchain) =>
          chain.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setCurrentWalletChains(chains);
    }
  }, [search]);

  // variables
  const snapPoints = useMemo(() => ['55%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      handleStyle={styles.handle}
      backgroundStyle={styles.content}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.actions}>
        <SquareButton icon="close" onPress={onClose} />
      </View>
      <BottomSheetTextInput
        placeholder="Search"
        value={search}
        onChangeText={(value: string) => setSearch(value)}
        style={styles.input}
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
    backgroundColor: '#2D2A24',
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
  },
  handle: {
    display: 'none',
  },
  input: {
    backgroundColor: '#221F1A',
    borderRadius: 15,
    marginHorizontal: 10,
    fontSize: 18,
    marginBottom: 10,
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
