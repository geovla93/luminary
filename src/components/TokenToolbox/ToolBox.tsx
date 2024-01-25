/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Button, Typography} from '@ui/core/components';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import SquareButton from '@ui/core/components/SquareButton';
import {List} from 'react-native-paper';
import {SCREENS} from '@screens/screens';

interface INavigation {
  navigate: (screen: string) => void;
}
const TokenToolbox = ({sheetRef, onClose, onSortSelect, selected}: any) => {
  const navigation = useNavigation<INavigation>();
  const snapPoints = React.useMemo(() => ['55%'], []);
  return (
    <BottomSheet
      ref={sheetRef}
      backgroundStyle={styles.root}
      handleStyle={styles.handle}
      index={0}
      snapPoints={snapPoints}>
      <BottomSheetView style={styles.content}>
        <View style={styles.actions}>
          <Typography variant={'headlineSmall'}>Sort Tokens</Typography>
          <SquareButton icon="close" onPress={onClose} />
        </View>
        <List.Section>
          <List.Item
            style={styles.listItem}
            onPress={() => onSortSelect('name')}
            title="Token Name"
            description="Sort tokens by name"
            // checked icon
            right={() =>
              selected === 'name' && <List.Icon icon="check-circle-outline" />
            }
          />
          <List.Item
            style={styles.listItem}
            onPress={() => onSortSelect('price')}
            title="Token Price"
            description="Sort tokens by price"
            right={() =>
              selected === 'price' && <List.Icon icon="check-circle-outline" />
            }
          />
          <List.Item
            style={styles.listItem}
            onPress={() => onSortSelect('value')}
            title="Token Holdings"
            description="Sort tokens by holdings"
            right={() =>
              selected === 'value' && <List.Icon icon="check-circle-outline" />
            }
          />
        </List.Section>
      </BottomSheetView>
      <Button
        onPress={() => {
          onClose();
          navigation.navigate(SCREENS.APP_MANAGE_TOKENS_SCREEN);
        }}
        size="small"
        sx={styles.button}>
        Manage Tokens
      </Button>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#2D2A24',
  },
  content: {
    backgroundColor: '#2D2A24',
    paddingHorizontal: 20,
  },
  handle: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 40,
  },
  listItem: {
    backgroundColor: '#1E1C1A',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
});

export default TokenToolbox;
