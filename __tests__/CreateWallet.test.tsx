/**
 * @format
 */

import 'react-native';

import {it, expect, beforeAll} from '@jest/globals';

import WalletManager from 'src/blockchain/evm/WalletManager';
import {HDNodeWallet, verifyMessage} from 'ethers';

let manager: WalletManager;

beforeAll(async () => {
  manager = new WalletManager();
  const wallet = await manager.createWallet();
  expect(wallet).not.toBeNull();
});

it('it has the right derivation path', async () => {
  expect(manager.getDerivationPath()).toBe("m/44'/60'/0'/0/0");
});

it('it has the right address', async () => {
  expect(manager.getAddress().length).toBe(42);
});

it('it has the right mnemonic', async () => {
  expect(manager.getMnemonic().phrase.split(' ').length).toBe(12);
});

it('it has the wallet created', async () => {
  const wallet = manager.getWallet();
  expect(wallet).not.toBeNull();
  if (wallet) {
    expect(wallet.privateKey).not.toBeNull();
  }
});

it('can sign a message', async () => {
  const message = 'Hello World';
  const wallet = manager.getWallet() as HDNodeWallet;
  const signature = await wallet.signMessage(message);
  expect(signature).not.toBeNull();
  // check signature
  const address = wallet.address;
  const recoveredAddress = await verifyMessage(message, signature);
  expect(recoveredAddress).toBe(address);
});

it('can be recovered', async () => {
  const recovered = new WalletManager();
  const wallet = await recovered.recoverWallet(
    manager.getMnemonic().phrase,
    '0',
  );
  expect(recovered.derivationPath).toBe("m/44'/60'/0'/0/0");
  expect(wallet?.address).toBe(manager.getAddress());
});