import useOnboarding from '@hooks/useOnboarding';
import blockchains from '../../blockchain';
import {WalletBuilder} from 'src/blockchain/utils/WalletBuilder';
import {IEntropies} from '@itypes/blockchain';
import useCredentials from '@hooks/useCredentials';
import {useAppDispatch} from '@redux/hook';
import {setWalletData} from '@redux/slices/wallet.slice';
import {WALLET_ENCRYPTION_VERSION, agreementMessage} from '@utils/config';
import {ethers} from 'ethers';

interface ICreateWallet {
  createWallet: () => Promise<boolean>;
}

const useCreateWallet = (): ICreateWallet => {
  const {setOnboardingState} = useOnboarding();
  const {storeCredentials} = useCredentials();
  const dispatch = useAppDispatch();

  const checkWalletBySigningMessage = async (
    wallet: ethers.HDNodeWallet,
  ): Promise<string> => {
    const signature = await wallet.signMessage(agreementMessage);
    return signature;
  };

  // Helper function to store credentials
  const storeWalletCredentials = async (_entropies: IEntropies) => {
    const credentials = JSON.stringify({
      version: WALLET_ENCRYPTION_VERSION,
      entropies: _entropies,
    });

    await storeCredentials('entropy', credentials);
  };

  // Function to create and dispatch wallet data
  const createRandom = async () => {
    const walletBuilder = new WalletBuilder(blockchains);
    const wallet = await walletBuilder.createWallet();

    const _addresses = walletBuilder.getAddresses();
    const _entropies: IEntropies = walletBuilder.getEntropies();
    const _chainConfig = walletBuilder.getWalletConfig();

    await storeWalletCredentials(_entropies);
    const signature = await checkWalletBySigningMessage(wallet);
    dispatch(
      setWalletData({
        addresses: _addresses,
        chainConfig: _chainConfig,
        mode: 'phrase',
        signature,
      }),
    );
  };

  // Main function to create wallet
  const createWallet = async (): Promise<boolean> => {
    try {
      setOnboardingState('loading');
      await createRandom();
      setOnboardingState('created');
      return true;
    } catch (error) {
      console.error('Error in wallet creation process:', error);
      throw new Error('Error creating or storing wallet credentials');
    }
  };

  return {createWallet};
};

export default useCreateWallet;
