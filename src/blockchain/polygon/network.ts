import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Polygon',
  chainId: 137,
  url: 'https://polygon-rpc.com',
  mainnet: true,
  explorer: {
    name: 'Polygonscan',
    getTransactionUrl: (hash: string) => `https://polygonscan.com/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://polygonscan.com/address/${address}`,
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
