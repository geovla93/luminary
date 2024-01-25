import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Ethereum',
  chainId: 1,
  url: 'https://mainnet.infura.io/v3/d225f4d6c42f4396b5d9198ddfcf1747',
  mainnet: true,
  explorer: {
    name: 'Etherscan',
    getTransactionUrl: (hash: string) => `https://etherscan.io/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://etherscan.io/address/${address}`,
  },
};

export const testnet: IBlockchainNetwork = {
  name: 'Ropsten',
  chainId: 3,
  url: 'https://ropsten.infura.io/v3/d225f4d6c42f4396b5d9198ddfcf1747',
  mainnet: false,
  explorer: {
    name: 'Etherscan Testnet',
    getTransactionUrl: (hash: string) =>
      `https://ropsten.etherscan.io/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://ropsten.etherscan.io/address/${address}`,
  },
};

export const networks: IBlockchainNetwork[] = [mainnet, testnet];
