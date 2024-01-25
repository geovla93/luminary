import {useCallback} from 'react';
import {encryptData, decryptData} from '@utils/encryption';
import {storeSensitiveData, getSensitiveData} from '@utils/encryptedStorage';
import {Mnemonic, HDNodeWallet} from 'ethers';
import {WALLET_ENCRYPTION_VERSION, agreementMessage} from '@utils/config';
import useCredentials from './useCredentials';

function useWalletSecurity() {
  const {storeCredentials, getCredentials} = useCredentials();

  // Encrypt and store wallet credentials
  const encryptAndStoreCredentials = useCallback(
    async (walletData: string, password: string): Promise<void> => {
      if (!walletData || !password) {
        throw new Error(
          'Invalid arguments. Wallet data and password are required.',
        );
      }
      const encryptedCredentials = encryptData(walletData, password);
      if (!encryptedCredentials) {
        throw new Error('Failed to encrypt credentials');
      }
      await storeCredentials('wallet', encryptedCredentials);
    },
    [],
  );

  // Encrypt and store password and address for pin validation
  const encryptAndStoreForPinValidation = useCallback(
    async (password: string, pin: string, address: string): Promise<void> => {
      const encryptedPass = encryptData(password, pin);
      const encryptedAddress = encryptData(address, pin);
      if (!encryptedPass || !encryptedAddress) {
        throw new Error('Failed to encrypt password or address');
      }
      await storeSensitiveData('pws', encryptedPass);
      await storeSensitiveData('unlock', encryptedAddress);
    },
    [],
  );

  // Check if the encryption process was successful
  const verifyWalletEncryption = async (
    pin: string,
    walletKey: string,
  ): Promise<string> => {
    if (!pin || !walletKey) {
      throw new Error('Invalid arguments for wallet encryption verification');
    }
    const credentials = await getCredentials();
    if (!credentials) {
      throw new Error('Credentials not found');
    }
    const encryptedPass = await getSensitiveData('pws');
    if (!encryptedPass) {
      throw new Error('Password not found');
    }
    const pass = decryptData(encryptedPass, pin);

    const decryptedCredentials = decryptData(
      credentials.password,
      pass,
      'object',
    );
    if (!decryptedCredentials) {
      throw new Error('Failed to decrypt credentials');
    }

    if (decryptedCredentials.version !== WALLET_ENCRYPTION_VERSION) {
      throw new Error('Invalid wallet version');
    }

    const walletData = decryptedCredentials.wallets[walletKey];
    const mnemonic = Mnemonic.fromEntropy(walletData.secret);
    const signer = HDNodeWallet.fromMnemonic(
      mnemonic,
      walletData.derivationPath,
    );
    const signature = await signer.signMessage(agreementMessage);

    return signature;
  };

  return {
    encryptAndStoreCredentials,
    encryptAndStoreForPinValidation,
    verifyWalletEncryption,
  };
}

export default useWalletSecurity;
