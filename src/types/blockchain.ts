// import {BigNumber} from 'bignumber.js';
import {IBlockchainNetwork} from './networks';
// import {IToken} from './token';
import {IBlockchainDriver} from './IBlockchainDriver';

export interface IBlockchainConfig {}

export enum Blockchain {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon-pos',
  ACRIA = 'acria-intellichain',
  BNB = 'binance-smart-chain',
  FANTOM = 'fantom',
  MANTA = 'manta-pacific',
  ARBITRUM = 'arbitrum-one',
}

export type IBlockchainAddresses = {
  [key in Blockchain]: string;
};

export type IEntropy = {
  evm: boolean;
  entropy: string;
  derivationPath: string;
};

export type IEntropies = {
  [key in Blockchain]: IEntropy;
};

export type IStoredEntropy = {
  version: number;
  entropies: {
    [key in Blockchain]: IEntropies[key];
  };
};

type BlockchainDriverConstructor = new (
  wallet: any,
  config: IBlockchain,
) => IBlockchainDriver;

export interface IBlockchain {
  id: number | string;
  shortName: Blockchain;
  hasNFTs: boolean;
  name: string;
  address?: string;
  image: any;
  walletDriver: BlockchainDriverConstructor;
  mode: 'evm' | 'rpc';
  enabled: boolean;
  networks: {
    mainnet: IBlockchainNetwork;
    testnet: IBlockchainNetwork;
  };
}

export type IBlockchains = {
  [K in Blockchain]: IBlockchain;
};

// export interface IBlockchainType {
//   derivationPath: string;
//   config: any; // TODO: define config type
//   network: IBlockchainNetwork;
//   networks: {
//     mainnet: IBlockchainNetwork;
//     testnet: IBlockchainNetwork;
//   };
//   defaultTokens: any; // ITokenConfig[];
//   defaultOrder: number;
//   feeOptions: {
//     gasPriceToken: any; // string
//     defaults: {
//       gasPrice: BigNumber;
//       gasLimit: {
//         [TokenType.NATIVE]: BigNumber;
//         [TokenType.ERC20]: BigNumber;
//       };
//       gasPricePresets: {
//         low: {
//           gasPrice: BigNumber;
//           maxFeePerGas: BigNumber;
//           maxPriorityFeePerGas: BigNumber;
//         };
//         medium: {
//           gasPrice: BigNumber;
//           maxFeePerGas: BigNumber;
//           maxPriorityFeePerGas: BigNumber;
//         };
//         high: {
//           gasPrice: BigNumber;
//           maxFeePerGas: BigNumber;
//           maxPriorityFeePerGas: BigNumber;
//         };
//       };
//     };
//   };
// }
