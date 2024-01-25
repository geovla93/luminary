import {CURRENCIES} from 'src/blockchain/currencies';
import axios from './config';

export const authenticateWallet = (request: any) =>
  axios.post('/wallet/follow-address', request);

export const getPrices = async (tokenList: string) => {
  const currencies_string = Object.values(CURRENCIES).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenList}&vs_currencies=${currencies_string}&include_market_cap=true&include_24hr_change=true`;
  return await axios.get(url);
};

export const getWalletUser = () => axios.get('/wallet/user');
