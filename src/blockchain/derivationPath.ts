export interface IDerivationPath {
  name: string;
  path: string;
  desc: string;
  type: string;
  regex: RegExp;
}

const derivationPaths: IDerivationPath[] = [
  {
    name: 'BIP44',
    path: "m/44'/60'/0'/0/n",
    desc: 'MetaMask, Trezor, MyEtherWallet, Trust Wallet',
    type: 'bip44',
    regex: /^m\/44'\/60'\/0'\/0\/\d+$/,
  },
  {
    name: 'Ledger Live',
    path: "m/44'/60'/n'/0/0",
    desc: 'Ledger Live',
    type: 'ledgerLive',
    regex: /^m\/44'\/60'\/\d+'\/0\/0$/,
  },
  {
    name: 'Ethereum Legacy',
    path: "m/44'/60'/0'/n",
    desc: 'Legacy (pre-2019) wallets',
    type: 'legacy',
    regex: /^m\/44'\/60'\/0'\/\d+$/,
  },
  {
    name: 'Custom',
    path: "m/44'/60'/0'/0/n",
    desc: 'Custom derivation path',
    type: 'custom',
    regex: /^m\/44'\/60'\/\d+'\/\d+\/\d+$/,
  },
];

export default derivationPaths;
