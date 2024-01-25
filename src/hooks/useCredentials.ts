import * as Keychain from 'react-native-keychain';

interface IUseCredentials {
  storeCredentials: (
    user: string,
    token: string,
    service: string,
  ) => Promise<false | Keychain.Result>;
  getCredentials: (
    service: string,
  ) => Promise<false | Keychain.UserCredentials>;
  removeCredentials: (service: string) => Promise<boolean>;
  removeAllCredentials: () => Promise<boolean>;
}

const useCredential = (): IUseCredentials => {
  const storeCredentials = (user: string, token: string, service: string) => {
    return Keychain.setGenericPassword(user, token, {
      service: service,
      storage: Keychain.STORAGE_TYPE.AES,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      rules: Keychain.SECURITY_RULES.AUTOMATIC_UPGRADE,
    });
  };

  const getCredentials = (service: string) => {
    return Keychain.getGenericPassword({
      service: service,
      storage: Keychain.STORAGE_TYPE.AES,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      rules: Keychain.SECURITY_RULES.AUTOMATIC_UPGRADE,
    });
  };

  const removeCredentials = (service: string) => {
    return Keychain.resetGenericPassword({
      service: service,
      storage: Keychain.STORAGE_TYPE.AES,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      rules: Keychain.SECURITY_RULES.AUTOMATIC_UPGRADE,
    });
  };

  const removeAllCredentials = async (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const services = await Keychain.getAllGenericPasswordServices();
        for (const service of services) {
          await removeCredentials(service);
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    storeCredentials,
    getCredentials,
    removeCredentials,
    removeAllCredentials,
  };
};

export default useCredential;
