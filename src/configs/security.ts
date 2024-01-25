// INFO: DO NOT TOUCH THIS FILE
export const RANDOM_KEY_SALT = 'iluminary-wallet';
export const IV_LENGTH = 32;
export const ITERATIONS = 30_000;
export const KEY_PREFIX = 'iw-';
export const ENCRYPTION_KEY_NAME = 'iluminary-wallet-encryption-key';
export const ENCRYPTED_PASSWORD_KEY = 'iluminary-wallet-password';
export const WALLET_UNLOCK_KEY = 'unlock';
export const WALLET_ENCRYPTION_VERSION = '1';
export const LOCK_PERIOD = 180 * 1000;

export const DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0";
export const encryptionServices = {
  walletServiceEncryption: 'com.iluminary.wallet',
  passwordServiceEncryption: 'com.iluminary.password',
};
