import {IBlockchainNetwork} from '@itypes/networks';

export const mainnet: IBlockchainNetwork = {
  name: 'Manta Pacific L2 Rollup',
  chainId: 169,
  url: 'https://pacific-rpc.manta.network/http',
  mainnet: true,
  explorer: {
    name: 'MantaScan',
    getTransactionUrl: (hash: string) =>
      `https://pacific-explorer.manta.network/tx/${hash}`,
    getAddressUrl: (address: string) =>
      `https://pacific-explorer.manta.network/address/${address}`,
  },
};

export const testnet: IBlockchainNetwork = {} as IBlockchainNetwork;

export const networks: IBlockchainNetwork[] = [mainnet, testnet];
