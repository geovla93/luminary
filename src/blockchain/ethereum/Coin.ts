import {IWalletToken} from '@itypes/ERC20';
import {IToken} from '@itypes/token';
import {Network} from './ChainNetwork';
import {ethers} from 'ethers';

class Coin implements IWalletToken {
  config: IToken;
  balance: string;
  network: any;
  wallet: any;
  constructor(wallet: any, config: IToken, network: Network) {
    this.config = config;
    this.balance = '0';
    this.network = network;
    this.wallet = wallet;
  }

  getBalance(): Promise<string> {
    return this.getBalanceFormatted(
      this.network.getProvider().getBalance(this.wallet.address),
      this.config.decimals,
    );
  }

  protected async getBalanceFormatted(
    balance: Promise<ethers.BigNumberish>,
    decimals: number,
  ) {
    this.balance = ethers.formatUnits(await balance, decimals);
    return this.balance;
  }

  public async transfer(_to: string, _amount: string): Promise<string> {
    return '0x';
  }
}

export default Coin;
