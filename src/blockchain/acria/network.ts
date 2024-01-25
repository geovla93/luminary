import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Acria IntelliChain',
  chainId: 47,
  url: 'https://aic.acria.ai',
  mainnet: true,
  explorer: {
    name: 'BscScan',
    getTransactionUrl: (hash: string) => `https://explorer.acria.ai/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://explorer.acria.ai/address/${address}`,
  },
};

export const testnet: IBlockchainNetwork = {
  ...mainnet,
  mainnet: false,
};

export const networks: IBlockchainNetwork[] = [mainnet, testnet];
