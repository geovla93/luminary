import React from 'react';
import {useIntl} from 'react-intl';
import {Typography} from '@ui/core/components';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SquareButton from '@ui/core/components/SquareButton';
import {CURRENCIES, ICurrency, currencies} from 'src/blockchain/currencies';
import {Divider} from 'react-native-paper';
import Checkbox from '@ui/core/components/Checkbox';
import useApplication from '@hooks/useApplication';

interface INavigation {
  goBack: () => void;
}

interface IProps {
  navigation: INavigation;
}

const CurrencyItem = ({
  currency,
  isSelected,
  onPress,
}: {
  currency: ICurrency;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Typography>
        {currency.name} ({currency.currency.toUpperCase()})
      </Typography>
      <Checkbox checked={isSelected} onCheckChange={() => {}} />
    </TouchableOpacity>
  );
};

const SelectCurrencyScreen = ({navigation}: IProps) => {
  const {formatMessage} = useIntl();
  const {currency, setAppCurrency} = useApplication();

  const handleCurrencyChange = (_currency: CURRENCIES) => {
    setAppCurrency(_currency);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View />
        <Typography fontWeight="bold" variant="titleMedium">
          {formatMessage({id: 'select_app_currency'})}
        </Typography>
        <View>
          <SquareButton onPress={() => navigation.goBack()} icon="close" />
        </View>
      </View>
      <View>
        <FlatList
          data={currencies}
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CurrencyItem
              currency={item}
              onPress={() => handleCurrencyChange(item.currency)}
              isSelected={currency === item.currency}
            />
          )}
          keyExtractor={item => item.currency}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SelectCurrencyScreen;
