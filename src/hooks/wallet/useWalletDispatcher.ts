import {Blockchain} from '@itypes/blockchain';
import {IWallet, WalletRestoreType} from '@itypes/wallet';
import {useAppDispatch} from '@redux/hook';
import {addWallet} from '@redux/slices/wallet.slice';

interface IEvmDispatchedWallet {
  index: number;
  key: string;
  address: string;
  derivationPath: string;
  backedUp: boolean;
  signature: string;
  chains: Blockchain[];
  type: WalletRestoreType;
}

/**
 * In the future, we will use this hook to dispatch different wallets to the redux store.
 * @returns
 */

const useWalletDispatcher = () => {
  const dispatch = useAppDispatch();
  const dispatchEvmWallet = (walletDescription: IEvmDispatchedWallet) => {
    const {chains} = walletDescription;
    const walletToDispatch = {} as IWallet;
    if (!chains || chains.length === 0) {
      throw new Error('Invalid wallet chains');
    }
    walletToDispatch.isMain = false;
    walletToDispatch.index = walletDescription.index;
    walletToDispatch.address = walletDescription.address;
    walletToDispatch.backedUp = walletDescription.backedUp;
    walletToDispatch.type = walletDescription.type;
    walletToDispatch.chains = {} as IWallet['chains'];
    walletToDispatch.updated = false;
    walletToDispatch.balance = {
      total: 0,
      profit: 0,
      change: 0,
    };
    for (const chain of chains as Blockchain[]) {
      walletToDispatch.chains[chain] = {
        address: walletDescription.address,
        chain,
        secretId: walletDescription.key,
        derivationPath: walletDescription.derivationPath,
        configs: {},
        visible: true,
      };
    }

    dispatch(
      addWallet({
        index: walletDescription.index,
        key: walletDescription.key,
        address: walletDescription.address,
        wallet: walletToDispatch,
        signature: walletDescription.signature,
      }),
    );
  };
  return {
    dispatchEvmWallet,
  };
};

export default useWalletDispatcher;
