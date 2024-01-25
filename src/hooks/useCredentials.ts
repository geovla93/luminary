import * as Keychain from 'react-native-keychain';

const useCredential = () => {
  const storeCredentials = (user: string, token: string) => {
    return Keychain.setGenericPassword(user, token);
  };
  const getCredentials = () => {
    return Keychain.getGenericPassword();
  };
  const removeCredentials = () => {
    return Keychain.resetGenericPassword();
  };
  return {storeCredentials, getCredentials, removeCredentials};
};

export default useCredential;
