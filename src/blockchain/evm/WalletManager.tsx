import {HDNodeWallet, Mnemonic, ethers} from 'ethers';
import {Blockchain} from '@itypes/blockchain';
import {EVM_CHAINS} from '..';

class WalletManager {
  public walletIndex = 0;
  public address: string | null = null;
  public derivationPath: string | null = null;
  private wallet: HDNodeWallet | null = null;
  private mnemonic: Mnemonic | null = null;
  public chains: Blockchain[] = EVM_CHAINS;

  constructor() {}

  public randomPhrase(): Mnemonic {
    return ethers.Wallet.createRandom().mnemonic as Mnemonic;
  }

  private async createWalletInternal(
    derivationPath: string,
    mnemonic?: Mnemonic,
  ): Promise<ethers.HDNodeWallet> {
    return new Promise((resolve, reject) => {
      try {
        if (mnemonic) {
          this.mnemonic = mnemonic;
        } else {
          this.mnemonic = this.randomPhrase();
        }
        this.wallet = ethers.HDNodeWallet.fromMnemonic(
          this.mnemonic,
          derivationPath,
        );

        this.address = this.wallet.address;
        this.mnemonic = this.wallet.mnemonic;

        resolve(this.wallet);
      } catch (e) {
        reject(e);
      }
    });
  }

  public createWallet(walletIndex: number = 0): Promise<HDNodeWallet> {
    return new Promise(async (resolve, reject) => {
      try {
        this.walletIndex = walletIndex;
        this.derivationPath = `m/44'/60'/0'/0/${this.walletIndex}`;
        const freshWallet = await this.createWalletInternal(
          this.derivationPath,
        );
        resolve(freshWallet);
      } catch (e) {
        reject(e);
      }
    });
  }

  public async recoverWallet(
    passPhrase: string,
    accountIndex = '0',
  ): Promise<HDNodeWallet> {
    try {
      this.mnemonic = Mnemonic.fromPhrase(passPhrase);
      this.walletIndex = parseInt(accountIndex, 10);
      this.derivationPath = `m/44'/60'/0'/0/${this.walletIndex}`;
      return await this.createWalletInternal(
        this.derivationPath,
        this.mnemonic,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Recovery Error:', error.message);
      } else {
        console.error('An unknown error occurred during wallet recovery');
      }
      throw error;
    }
  }

  public getWallet(): HDNodeWallet | null {
    return this.wallet;
  }

  public getMnemonic(): Mnemonic {
    if (!this.mnemonic) {
      throw new Error('Mnemonic not found');
    }
    return this.mnemonic;
  }

  public getAddress(): string {
    if (!this.wallet) {
      throw new Error('Wallet not found');
    }
    return this.wallet.address;
  }

  public getDerivationPath(): string {
    return this.derivationPath || '';
  }

  public getEntropy(): string {
    return this.getMnemonic().entropy;
  }
}

export default WalletManager;
