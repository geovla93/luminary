import {IToken} from '@itypes/token';
export interface IWalletToken {
  config: IToken;
  balance: string;
  getBalance: () => Promise<string>;
  transfer: (to: string, amount: string) => Promise<string>;
}
