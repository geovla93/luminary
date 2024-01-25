import React, {useEffect, useState} from 'react';
import HeaderComponent from '@components/HeaderComponent';
import InformationBox from '@components/InformationBox';
import {Button, Typography} from '@ui/core/components';
import TextField from '@ui/core/components/TextField';
import {colors} from '@ui/core/theme';
import {useIntl} from 'react-intl';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {useWalletAsUser} from '@hooks/useWalletAsUser';

const regex = /^[a-zA-Z0-9]+$/;

const CreateUsernameScreen = ({navigation}: any) => {
  const {formatMessage} = useIntl();
  const {setAlias, dispatchUserInfo} = useWalletAsUser();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleUsernameChange = (value: string) => {
    // remove spaces
    value = value.replace(/\s/g, '');
    // and special characters
    value = value.replace(/[^\w\s]/gi, '');
    // and lowercase
    value = value.toLowerCase();
    if (value.length > 15) {
      return;
    }
    setUsername(value);
  };

  useEffect(() => {
    if (username.length >= 3 && regex.test(username) && !error) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [username, error]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setAlias(username)
      .then((res: any) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          dispatchUserInfo(res.data.user);
          navigation.goBack();
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <View style={styles.root}>
      <HeaderComponent
        title="create_username_title"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : undefined}>
        <View style={styles.container}>
          <Typography variant="bodyLarge" mb={20} textAlign="center">
            {formatMessage({id: 'create_username_subtitle'})}
          </Typography>

          <TextField
            left={() => (
              <Typography pl={15} variant="bodyLarge" color={colors.primary}>
                @
              </Typography>
            )}
            borderColor={colors.primary}
            right={() => {
              if (isSubmitting) {
                return (
                  <ActivityIndicator
                    style={{marginRight: 15}}
                    size="small"
                    color={colors.primary}
                  />
                );
              }
            }}
            placeholderTextColor={'#49454F'}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            error={!isValid && username.length > 0}
            sx={{color: colors.primary}}
            placeholder={formatMessage({id: 'username_placeholder'})}
            onChangeText={(_value: string) => {
              if (error) {
                setError('');
              }
              handleUsernameChange(_value);
            }}
            value={username}
          />
          {error && (
            <Typography
              variant="bodySmall"
              color="red"
              mt={10}
              textAlign="left">
              {formatMessage({id: error})}
            </Typography>
          )}

          <InformationBox
            content={formatMessage({id: 'create_username_info'})}
          />

          <View style={styles.content}>
            <Button disabled={!isValid} onPress={() => handleSubmit()}>
              {formatMessage({id: 'create_username_button'})}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = {
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
  },
};

export default CreateUsernameScreen;
