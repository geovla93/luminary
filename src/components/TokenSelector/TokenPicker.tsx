import React, {useMemo, useCallback, useEffect, useState} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {View, StyleSheet} from 'react-native';

import SquareButton from '@ui/core/components/SquareButton';
import TokenItem from './TokenItem';
import {IToken} from '@itypes/token';
import {Divider} from 'react-native-paper';
import {Typography} from '@ui/core/components';
import {useIntl} from 'react-intl';

interface ITokenPicker {
  tokens: IToken[];
  bottomSheetRef: any;
  onPress: (token: IToken) => void;
  onClose: () => void;
}

const TokenPicker = ({
  bottomSheetRef,
  tokens,
  onPress,
  onClose,
}: ITokenPicker) => {
  const {formatMessage} = useIntl();
  const [search, setSearch] = useState('');
  const [currentTokens, setCurrentTokens] = useState<IToken[]>([]);
  useEffect(() => {
    setCurrentTokens(tokens);
  }, [tokens]);

  useEffect(() => {
    if (search) {
      setCurrentTokens(
        tokens.filter(
          (_token: IToken) =>
            _token.name.toLowerCase().includes(search.toLowerCase()) ||
            _token.symbol.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setCurrentTokens(tokens);
    }
  }, [search]);

  // variables
  const snapPoints = useMemo(() => ['55%', '90%'], []);

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
      <View style={styles.actions}>
        <View />
        <Typography fontWeight="bold" variant="bodyLarge">
          {formatMessage({id: 'select_token'})}
        </Typography>
        <SquareButton icon="close" onPress={onClose} />
      </View>
      <BottomSheetTextInput
        placeholder={formatMessage({id: 'search_token'})}
        value={search}
        onChangeText={(value: string) => setSearch(value)}
        style={styles.input}
        focusable
      />
      <BottomSheetFlatList
        data={currentTokens}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={item => item.symbol}
        renderItem={item => {
          return (
            <TokenItem
              item={item.item}
              onPress={(_token: IToken) => onPress(_token)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  handle: {
    display: 'none',
  },
  input: {
    backgroundColor: '#2D2A24',
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

export default TokenPicker;
