import {ethers} from 'ethers';
import Coin from './Coin';
import {IWalletToken} from '@itypes/ERC20';
import {ERC20_ABI} from './abi';
import {IToken} from '@itypes/token';
import {Network} from './ChainNetwork';

class Token extends Coin implements IWalletToken {
  contract: any;
  constructor(wallet: any, config: IToken, network: Network) {
    super(wallet, config, network);
    if (!config.contractAddress) {
      throw new Error('Contract address not provided');
    }
    this.contract = new ethers.Contract(
      config.contractAddress,
      ERC20_ABI,
      this.network.getProvider(),
    );
  }
  getBalance(): Promise<string> {
    return this.getBalanceFormatted(
      this.contract.balanceOf(this.wallet.address),
      this.config.decimals,
    );
  }
}

export default Token;
