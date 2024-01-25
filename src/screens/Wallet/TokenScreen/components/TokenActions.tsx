import {IToken} from '@itypes/token';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '@screens/screens';
import {Button} from '@ui/core/components';
import React from 'react';
import {useIntl} from 'react-intl';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';

const TokenActions = ({token}: {token: IToken}) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const {formatMessage} = useIntl();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}>
      <View style={styles.actions}>
        <Button
          variant="contained"
          size="small"
          sx={styles.btn}
          buttonColor="#FFC107"
          onPress={() =>
            navigation.navigate(SCREENS.APP_RECEIVE_CRYPTO_SCREEN, {token})
          }
          icon="arrow-down">
          {formatMessage({id: 'receive'})}
        </Button>
        <Button
          variant="contained"
          size="small"
          buttonColor="#514700"
          textColor={theme.colors.primary}
          sx={styles.btn}
          onPress={() =>
            navigation.navigate(SCREENS.APP_SEND_CRYPTO_SCREEN, {
              screen: SCREENS.APP_SEND_SELECT_TO,
              params: {token},
            })
          }
          icon="arrow-up">
          {formatMessage({id: 'send'})}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tokenImageContainer: {},
  btn: {marginRight: 5},
});

export default TokenActions;
