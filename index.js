/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ethers} from 'ethers';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews',
]);

import crypto from 'react-native-quick-crypto';

ethers.randomBytes.register(length => {
  return new Uint8Array(crypto.randomBytes(length));
});

ethers.computeHmac.register((algo, key, data) => {
  return crypto.createHmac(algo, key).update(data).digest();
});

ethers.pbkdf2.register((passwd, salt, iter, keylen, algo) => {
  return crypto.pbkdf2Sync(passwd, salt, iter, keylen, algo);
});

ethers.sha256.register(data => {
  return crypto.createHash('sha256').update(data).digest();
});

ethers.sha512.register(data => {
  return crypto.createHash('sha512').update(data).digest();
});

AppRegistry.registerComponent(appName, () => App);
