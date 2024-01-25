import {Blockchain} from './blockchain';

export type WalletRestoreType = 'mnemonic' | 'privateKey';

export interface IWalletAddresses {
  address: string;
  derivationPath: string;
}
export interface IWalletChain {
  address: string;
  chain: Blockchain;
  secretId: string;
  derivationPath: string;
  configs: any;
  visible: boolean;
}

export interface IWallet {
  isMain: boolean;
  index: number;
  name?: string;
  address?: string;
  backedUp: boolean;
  type: WalletRestoreType;
  updated: boolean;
  balance: {
    total: number;
    profit: number;
    change: number;
  };
  chains: {
    [key: string]: IWalletChain;
  };
}

export interface IWalletPair {
  [key: string]: IWallet;
}
