/* eslint-disable @typescript-eslint/no-unused-vars */
import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import {IBlockchain, IBlockchainConfig} from '@itypes/blockchain';
import {IToken, TokenType} from '@itypes/token';
import Coin from './Coin';
import {Network} from './ChainNetwork';
import {ethers} from 'ethers';
import Token from './Token';

class EthereumDriver implements IBlockchainDriver {
  config: IBlockchain;
  network: any;
  wallet: any;
  assets: IToken[] = [];
  constructor(address: string, config: IBlockchain) {
    this.config = config;

    this.network = new Network(config, true);

    this.wallet = new ethers.VoidSigner(address, this.network.getProvider());
  }

  async getNativeTokenBalance(): Promise<string> {
    await this.wallet.connect(this.network.getProvider());
    return this.getBalanceFormatted(
      this.network.getProvider().getBalance(this.wallet.address),
      18, // currently only EVM is supported (all native tokens have 18 decimals)
    );
  }

  async getTokenBalance(token: IToken): Promise<string> {
    try {
      await this.wallet.connect(this.network.getProvider());
      if (token.type === TokenType.NATIVE) {
        const coin = new Coin(this.wallet, token, this.network);
        const balance = await coin.getBalance();
        return balance;
      } else {
        const _token = new Token(this.wallet, token, this.network);
        const balance = await _token.getBalance();
        this.assets.push({...token, balance});
        return balance;
      }
    } catch (error) {
      console.log(error);
      return '0';
    }
  }

  async getBalance(tokens: IToken[]): Promise<IToken[]> {
    await this.wallet.connect(this.network.getProvider());
    if (tokens.length > 0) {
      for (const token of tokens) {
        if (token.type === TokenType.NATIVE) {
          const coin = new Coin(this.wallet, token, this.network);
          const balance = await coin.getBalance();
          this.assets.push({...token, balance});
        } else {
          const _token = new Token(this.wallet, token, this.network);
          const balance = await _token.getBalance();
          this.assets.push({...token, balance});
        }
      }
    }
    return Promise.resolve(this.assets);
  }
  sendTransaction(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected async getBalanceFormatted(
    balance: Promise<ethers.BigNumberish>,
    decimals: number,
  ) {
    return ethers.formatUnits(await balance, decimals);
  }
}

export default EthereumDriver;
