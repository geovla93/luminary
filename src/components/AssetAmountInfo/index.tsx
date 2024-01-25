import React, {useMemo} from 'react';
import useApplication from '@hooks/useApplication';
import {IToken} from '@itypes/token';
import {Typography} from '@ui/core/components';
import {formatBalance, formatCurrency} from '@utils/displayNumbers';
import {View, StyleSheet, Pressable} from 'react-native';
import {colors} from '@ui/core/theme';

const AssetAmountInfo = ({
  token,
  onSelectMax,
}: {
  token: IToken;
  onSelectMax: () => void;
}) => {
  const {currency} = useApplication();

  const amount = useMemo(() => {
    try {
      return Number(token.balance) * Number(token.price[currency]);
    } catch (error) {
      return 0;
    }
  }, [token.balance, token.price, currency]);
  return (
    <View style={styles.root}>
      <View>
        <Typography fontWeight="bold" variant="bodyLarge">
          {formatBalance(token.balance, {
            maxFractionDigits: 4,
          })}{' '}
        </Typography>
        <Typography color="#CCC6BD" variant="bodySmall">
          {formatCurrency(amount, currency)}
        </Typography>
      </View>
      <View>
        <Pressable onPress={onSelectMax} style={styles.button}>
          <Typography color="black">Max</Typography>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0.7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
  button: {
    padding: 5,
    borderRadius: 18,
    backgroundColor: colors.primary,
  },
});

export default AssetAmountInfo;
