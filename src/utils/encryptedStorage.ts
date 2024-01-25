import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeSensitiveData(
  key: string,
  value: string,
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      await EncryptedStorage.setItem(key, value);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getSensitiveData(key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await EncryptedStorage.getItem(key);
      if (value) {
        resolve(value);
      } else {
        reject('No value found');
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function removeSensitiveData(key: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      await EncryptedStorage.removeItem(key);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
