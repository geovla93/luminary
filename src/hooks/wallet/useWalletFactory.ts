// Import external libraries
import {Mnemonic} from 'ethers';

// Import local utilities and configurations
import useCredentials from '@hooks/useCredentials';
import {useAppSelector} from '@redux/hook';
import {getSensitiveData} from '@utils/encryptedStorage';
import {decryptData} from '@utils/encryption';
import {KEY_PREFIX, encryptionServices} from 'src/configs/security';

/**
 * Custom hook to manage wallet operations.
 */
const useWalletFactory = () => {
  const {getCredentials} = useCredentials();
  const {walletPairs} = useAppSelector(state => state.wallet);

  /**
   * Retrieves the seed phrase for a given wallet.
   * @param {string} userPin - The user's PIN.
   * @param {string} walletId - The wallet's identifier.
   * @returns {Promise<string>} The wallet's seed phrase.
   * @throws {Error} If the wallet or credentials are invalid or decryption fails.
   */
  const getWalletSeedPhrase = async (userPin: string, walletId: string) => {
    const walletPair = walletPairs[walletId];
    if (!walletPair) {
      throw new Error(`Invalid wallet with ID: ${walletId}`);
    }

    // Extract and decrypt credentials
    const encryptedCredentials = await getCredentials(
      encryptionServices.walletServiceEncryption,
    );
    if (!encryptedCredentials) {
      throw new Error('Failed to retrieve credentials');
    }

    const walletCredentials = decryptData(
      encryptedCredentials.password,
      userPin,
    );
    if (!walletCredentials) {
      throw new Error('Failed to decrypt credentials');
    }

    // Extract and decrypt wallet private information
    const walletPrivateInfo = await getSensitiveData(
      `${KEY_PREFIX}${walletId}`,
    );
    const walletData = decryptData(
      walletPrivateInfo,
      walletCredentials,
      'object',
    );
    if (!walletData) {
      throw new Error('Failed to decrypt wallet data');
    }

    // Generate mnemonic from secret
    const {mode, secret} = walletData;
    if (mode === 'entropy') {
      const mnemonic = Mnemonic.fromEntropy(secret);
      return mnemonic.phrase;
    }

    throw new Error(`Invalid wallet mode for wallet ID: ${walletId}`);
  };

  return {getWalletSeedPhrase};
};

export default useWalletFactory;
