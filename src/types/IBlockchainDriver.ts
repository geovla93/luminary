import {IToken} from './token';

export interface IBlockchainDriver {
  getTokenBalance(...args: any[]): Promise<string>;
  getBalance(...args: any[]): Promise<IToken[]>;
  getNativeTokenBalance(...args: any[]): Promise<string>;
  sendTransaction(...args: any[]): Promise<void>;
}
