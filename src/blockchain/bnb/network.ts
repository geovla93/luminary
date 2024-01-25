import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Binance Smart Chain',
  chainId: 56,
  url: 'https://bsc-dataseed.binance.org/',
  mainnet: true,
  explorer: {
    name: 'BscScan',
    getTransactionUrl: (hash: string) => `https://bscscan.com/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://bscscan.com/address/${address}`,
  },
};

export const testnet: IBlockchainNetwork = {
  name: 'Binance Smart Chain Testnet',
  chainId: 97,
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  mainnet: false,
  explorer: {
    name: 'BscScan',
    getTransactionUrl: (hash: string) =>
      `https://testnet.bscscan.com/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://testnet.bscscan.com/address/${address}`,
  },
};

export const networks: IBlockchainNetwork[] = [mainnet, testnet];
