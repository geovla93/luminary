import {IBlockchain} from '@itypes/blockchain';
import {ethers} from 'ethers';

export class Network {
  url: string;
  chainId: number | string;
  isMainnet: boolean;
  name: string;
  provider: ethers.Provider;
  explorer: any;

  constructor(config: IBlockchain, isMainnet: boolean = true) {
    let network = isMainnet ? config.networks.mainnet : config.networks.testnet;
    if (!network) {
      network = config.networks.mainnet;
    }
    this.url = network.url;
    this.chainId = network.chainId;
    this.isMainnet = isMainnet;
    this.name = network.name;
    this.explorer = network.explorer;

    this.provider = new ethers.JsonRpcProvider(this.url, this.chainId, {
      polling: false,
      batchMaxCount: 1,
    });
  }

  public getProvider(): ethers.Provider {
    return this.provider;
  }

  public async checkValidNetwork(): Promise<boolean> {
    const network = await (this.provider as any).getNetwork();
    return network.chainId === this.chainId;
  }
}
