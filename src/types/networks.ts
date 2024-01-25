export type ChainIdType = number | string;

export interface IBlockchainNetwork {
  name: string;
  chainId: ChainIdType;
  url: string;
  mainnet: boolean;
  explorer: {
    name: string;
    getTransactionUrl: (hash: string) => string;
    getAddressUrl: (address: string) => string;
  };
}
