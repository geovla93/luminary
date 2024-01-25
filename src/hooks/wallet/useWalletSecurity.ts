import {useCallback} from 'react';
import {encryptData, decryptData} from '@utils/encryption';
import {storeSensitiveData, getSensitiveData} from '@utils/encryptedStorage';
import {Mnemonic, HDNodeWallet, verifyMessage} from 'ethers';
import {agreementMessage} from '@utils/config';
import useCredentials from '../useCredentials';
import {
  ENCRYPTION_KEY_NAME,
  KEY_PREFIX,
  WALLET_ENCRYPTION_VERSION,
  WALLET_UNLOCK_KEY,
  encryptionServices,
} from 'src/configs/security';

function useWalletSecurity() {
  const {storeCredentials, getCredentials} = useCredentials();

  // Encrypt and store wallet credentials
  const encryptAndStoreWalletCredentials = useCallback(
    async (credentials: string, password: string): Promise<void> => {
      if (!credentials || !password) {
        throw new Error('Invalid arguments. Wallet data and pin are required.');
      }
      const encryptedCredentials = encryptData(credentials, password);
      if (!encryptedCredentials) {
        throw new Error('Failed to encrypt credentials');
      }
      const res = await storeCredentials(
        ENCRYPTION_KEY_NAME,
        encryptedCredentials,
        encryptionServices.walletServiceEncryption,
      );
      if (!res) {
        throw new Error('Failed to store credentials');
      }
    },
    [],
  );

  const encryptAndStoreWalletData = useCallback(
    async (
      id: string,
      walletData: string,
      encryptionKey: string,
    ): Promise<void> => {
      if (!walletData || !encryptionKey) {
        throw new Error(
          'Invalid arguments. Wallet data and password are required.',
        );
      }
      const encryptedWalletData = encryptData(walletData, encryptionKey);
      if (!encryptedWalletData) {
        throw new Error('Failed to encrypt wallet data');
      }
      const res = await storeSensitiveData(
        `${KEY_PREFIX}${id}`,
        encryptedWalletData,
      );
      if (!res) {
        throw new Error('Failed to store wallet data');
      }
    },
    [],
  );

  // Encrypt and store password and address for pin validation
  const encryptAndStoreForPinValidation = useCallback(
    async (pin: string, address: string): Promise<void> => {
      if (!address) {
        throw new Error('Failed to encrypt password or address');
      }
      // encrypt address using pin
      const encryptedAddress = encryptData(address, pin);
      if (!encryptedAddress) {
        throw new Error('Failed to encrypt address');
      }
      const res = await storeSensitiveData(WALLET_UNLOCK_KEY, encryptedAddress);

      if (!res) {
        throw new Error('Failed to store password or address');
      }
    },
    [],
  );

  // Check if the encryption process was successful
  const verifyWalletEncryption = async (
    pin: string,
    walletKey: string,
    derivationPath: string,
  ): Promise<string> => {
    if (!pin || !walletKey) {
      throw new Error('Invalid arguments for wallet encryption verification');
    }

    // get the encrypted credentials
    const encryptedCredentials = await getCredentials(
      encryptionServices.walletServiceEncryption,
    );
    if (!encryptedCredentials) {
      throw new Error('Credentials not found');
    }
    // decrypt credentials
    const walletCredentials = decryptData(encryptedCredentials.password, pin);
    if (!walletCredentials) {
      throw new Error('Failed to decrypt credentials');
    }
    // convert to object

    const walletPrivateInfo = await getSensitiveData(
      `${KEY_PREFIX}${walletKey}`,
    );

    // decrypt wallet data
    const walletData = decryptData(
      walletPrivateInfo,
      walletCredentials,
      'object',
    );
    if (!walletData) {
      throw new Error('Failed to decrypt wallet data');
    }

    if (walletData.version !== WALLET_ENCRYPTION_VERSION) {
      throw new Error('Invalid wallet version');
    }

    const {mode, secret} = walletData;

    if (mode === 'entropy') {
      const mnemonic = Mnemonic.fromEntropy(secret);
      const signer = HDNodeWallet.fromMnemonic(mnemonic, derivationPath);
      const signature = await signer.signMessage(agreementMessage);

      // verify the signature
      const check = verifyMessage(agreementMessage, signature);
      if (check.toLocaleLowerCase() !== signer.address.toLocaleLowerCase()) {
        throw new Error('Failed to verify signature');
      }
      return signature;
    }
    throw new Error('Invalid wallet mode');
  };

  return {
    encryptAndStoreWalletCredentials,
    encryptAndStoreForPinValidation,
    encryptAndStoreWalletData,
    verifyWalletEncryption,
  };
}

export default useWalletSecurity;
