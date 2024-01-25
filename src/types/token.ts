import {Blockchain} from './blockchain';

export enum TokenType {
  NATIVE = 'NATIVE',
  ERC20 = 'ERC20',
  BEP20 = 'BEP20',
}

export interface ITokenData {
  id: string;
  coinPaprikaId?: string;
  name: string;
  symbol: string;
  type: TokenType.BEP20 | TokenType.ERC20;
  contractAddress: string;
  decimals: number;
  balance: string;
  chain: Blockchain;
  chainId: string;
  image?: string;
  price?: any;
  chainImage?: any;
  visible?: boolean;
}

export interface ICoinData {
  id: string;
  coinPaprikaId?: string;
  name: string;
  symbol: string;
  type: TokenType.NATIVE;
  decimals: number;
  contractAddress?: undefined;
  balance: string;
  chain: Blockchain;
  image?: string;
  price?: any;
  chainId: string;
  chainImage?: any;
  visible?: boolean;
}

export type SortTokenBy = 'price' | 'name' | 'value';

export type IToken = ITokenData | ICoinData;

export type ITokens = {
  [K in Blockchain]: IToken[];
};
