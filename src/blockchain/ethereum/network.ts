import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Ethereum',
  chainId: 1,
  url: 'https://mainnet.infura.io/v3/36a3eccdb2bc45f18906c9e2e5315de0',
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
  url: 'https://ropsten.infura.io/v3/36a3eccdb2bc45f18906c9e2e5315de0',
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
