import React from 'react';
import {Button, Typography} from '@ui/core/components';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  BackHandler,
} from 'react-native';

const WarningComponent = ({reason}: {reason: string}) => {
  const {formatMessage} = useIntl();
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            source={require('./components/img.png')}
            style={styles.image}
          />
          <Typography
            textAlign="center"
            fontWeight="bold"
            sx={styles.title}
            variant="titleLarge">
            {formatMessage({id: 'access_restricted'})}
          </Typography>
          <Typography
            sx={styles.subtitle}
            textAlign="center"
            variant="titleMedium">
            {formatMessage({id: reason})}
          </Typography>
          <Button
            size="small"
            onPress={() => BackHandler.exitApp()}
            buttonColor={colors.primary}
            textColor={colors.background}
            sx={{marginTop: 20}}>
            {formatMessage({id: 'exit_app'})}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
  title: {
    color: '#ffffff',
  },
  subtitle: {
    color: '#ffffff',
    marginTop: 20,
  },
});

export default WarningComponent;
