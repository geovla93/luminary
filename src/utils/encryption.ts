import Crypto from 'react-native-quick-crypto';
import {ITERATIONS, IV_LENGTH, RANDOM_KEY_SALT} from 'src/configs/security';

const getKeyFromPassword = (
  password: string,
  salt: any,
  keyLength: number,
  iterations: number,
  digest: string,
) => {
  return Crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
};

export function encryptData(
  data: string,
  password: string,
): string | undefined {
  try {
    const salt = Crypto.randomBytes(32);
    const keyLength = IV_LENGTH; // For AES-256, we need a 32-byte key
    const iterations = ITERATIONS; // The number of iterations, higher is more secure but slower
    const digest = 'sha256';
    const key = getKeyFromPassword(
      password,
      salt,
      keyLength,
      iterations,
      digest,
    );

    const iv = Crypto.randomBytes(16); // AES block size is 16 bytes
    const cipher = Crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV, the salt and the encrypted data, concatenated together
    // You might want to encode this output in base64 if you need to store or transmit it as a string
    const res = {
      iv: iv.toString('hex'), // !!! do not remove hex encoding even if the typescript compiler complains
      salt: salt.toString('hex'), //!!! do not remove hex encoding even if the typescript compiler complains
      encryptedData: encrypted,
    };

    return JSON.stringify(res);
  } catch (error) {
    console.error('Encryption error:', error);
  }
}

export function decryptData(
  data: string,
  password: string = '',
  returnType: string | object = 'string',
): any {
  try {
    const _encryptData = JSON.parse(data);
    if (_encryptData === null) {
      return null;
    }
    const keyLength = IV_LENGTH;
    const iterations = ITERATIONS;
    const digest = 'sha256';

    const iv = Buffer.from(_encryptData.iv, 'hex');
    const salt = Buffer.from(_encryptData.salt, 'hex');

    const key = getKeyFromPassword(
      password,
      salt,
      keyLength,
      iterations,
      digest,
    );

    const decipher = Crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(_encryptData.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    const result = decrypted.toString('utf8');
    if (returnType === 'object') {
      return JSON.parse(result);
    }
    return result;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}

export const hashPassword = (password: string): string => {
  const salt = Crypto.randomBytes(16).toString('hex');
  const keyLength = IV_LENGTH;
  const iterations = ITERATIONS;
  const hashedPassword = Crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLength,
    'sha512',
  ).toString('hex');

  return JSON.stringify({
    salt: salt,
    hash: hashedPassword,
  });
};

export const verifyPassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  const _hashedPassword = JSON.parse(hashedPassword);
  const salt = _hashedPassword.salt;
  const keyLength = IV_LENGTH;
  const iterations = ITERATIONS;
  const hash = _hashedPassword.hash;

  const newHash = Crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    keyLength,
    'sha512',
  ).toString('hex');

  return hash === newHash;
};

export const generateRandomKey = (): string => {
  const randomKey = Crypto.randomBytes(IV_LENGTH).toString('hex');
  const encryptionKey = Crypto.pbkdf2Sync(
    randomKey,
    RANDOM_KEY_SALT,
    ITERATIONS,
    IV_LENGTH,
    'sha512',
  ).toString('hex');
  return encryptionKey;
};
