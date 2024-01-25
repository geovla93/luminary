import React from 'react';

import {StyleSheet} from 'react-native';
import {Button} from '@ui/core/components';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {List, Switch} from 'react-native-paper';
import {SCREENS} from '@screens/screens';
import {useIntl} from 'react-intl';
import HeaderComponent from '@components/HeaderComponent';
import {colors} from '@ui/core/theme';

interface INavigation {
  navigate: (screen: string) => void;
}
const TokenToolbox = ({
  sheetRef,
  onClose,
  onSortSelect,
  toggleShowZeroBalance,
  hideZeroBalance,
  selected,
}: any) => {
  const navigation = useNavigation<INavigation>();
  const {formatMessage} = useIntl();
  const snapPoints = React.useMemo(() => ['60%'], []);
  return (
    <BottomSheet
      ref={sheetRef}
      backgroundStyle={styles.root}
      handleStyle={styles.handle}
      handleComponent={() => (
        <HeaderComponent title="sort_tokens" onClose={() => onClose()} />
      )}
      index={0}
      snapPoints={snapPoints}>
      <BottomSheetScrollView style={styles.content}>
        <List.Section>
          <List.Item
            style={styles.listItem}
            onPress={() => onSortSelect('name')}
            title={formatMessage({id: 'token_name'})}
            description={formatMessage({id: 'token_name_desc'})}
            // checked icon
            right={() =>
              selected === 'name' && <List.Icon icon="check-circle-outline" />
            }
          />
          <List.Item
            style={styles.listItem}
            onPress={() => onSortSelect('price')}
            title={formatMessage({id: 'token_price'})}
            description={formatMessage({id: 'token_price_desc'})}
            right={() =>
              selected === 'price' && <List.Icon icon="check-circle-outline" />
            }
          />
          <List.Item
            style={styles.listItem}
            onPress={() => onSortSelect('value')}
            title={formatMessage({id: 'token_balance'})}
            description={formatMessage({id: 'token_balance_desc'})}
            right={() =>
              selected === 'value' && <List.Icon icon="check-circle-outline" />
            }
          />

          <List.Item
            title={formatMessage({id: 'hide_zero_balances'})}
            description={formatMessage({id: 'hide_zero_balances_desc'})}
            right={() => (
              <Switch
                value={hideZeroBalance}
                color={colors.primary}
                onValueChange={() => toggleShowZeroBalance()}
              />
            )}
          />
        </List.Section>
      </BottomSheetScrollView>
      <Button
        onPress={() => {
          onClose();
          navigation.navigate(SCREENS.APP_MANAGE_TOKENS_SCREEN);
        }}
        size="small"
        sx={styles.button}>
        {formatMessage({id: 'manage_tokens'})}
      </Button>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1E1C1A',
  },
  content: {
    backgroundColor: '#1E1C1A',
    marginVertical: 10,
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
    backgroundColor: '#2D2A24',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
});

export default TokenToolbox;
