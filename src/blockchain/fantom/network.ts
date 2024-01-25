import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Fantom',
  chainId: 250,
  url: 'https://fantom.drpc.org',
  mainnet: true,
  explorer: {
    name: 'FtmScan',
    getTransactionUrl: (hash: string) => `https://ftmscan.com/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://ftmscan.com/address/${address}`,
  },
};

export const testnet: IBlockchainNetwork = {} as IBlockchainNetwork;

export const networks: IBlockchainNetwork[] = [mainnet, testnet];
