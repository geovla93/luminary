import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Arbitrum One',
  chainId: 42161,
  url: 'https://arb1.arbitrum.io/rpc',
  mainnet: true,
  explorer: {
    name: 'Arbitrum Explorer',
    getTransactionUrl: (hash: string) => `https://arbiscan.io/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://arbiscan.io/address/${address}`,
  },
};

export const testnet: IBlockchainNetwork = {
  name: 'Mumbai',
  chainId: 80001,
  url: 'https://rpc-mumbai.maticvigil.com',
  mainnet: false,
  explorer: {
    name: 'Polygonscan Mumbai',
    getTransactionUrl: (hash: string) =>
      `https://mumbai.polygonscan.com/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://mumbai.polygonscan.com/address/${address}`,
  },
};

export const networks: IBlockchainNetwork[] = [mainnet, testnet];
