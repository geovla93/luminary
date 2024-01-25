import {Blockchain} from '@itypes/blockchain';
import {IToken, TokenType} from '@itypes/token';

interface ITokens {
  [key: string]: IToken[];
}

export const defaultEVMTokens: ITokens = {
  [Blockchain.ETHEREUM]: [
    {
      id: 'ethereum',
      coinPaprikaId: 'eth-ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      type: TokenType.NATIVE,
      decimals: 18,
      chain: Blockchain.ETHEREUM,
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
  ],
  [Blockchain.BNB]: [
    {
      id: 'binancecoin',
      coinPaprikaId: 'bnb-binance-coin',
      name: 'BNB',
      symbol: 'BNB',
      type: TokenType.NATIVE,
      decimals: 18,
      chain: Blockchain.BNB,
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    },
  ],
  [Blockchain.POLYGON]: [
    {
      id: 'matic-network',
      coinPaprikaId: 'matic-network',
      name: 'Polygon',
      symbol: 'MATIC',
      type: TokenType.NATIVE,
      decimals: 18,
      chain: Blockchain.POLYGON,
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
    },
  ],
  [Blockchain.ACRIA]: [
    {
      id: 'acria',
      name: 'Acria',
      symbol: 'ACRIA',
      type: TokenType.NATIVE,
      decimals: 18,
      chain: Blockchain.ACRIA,
      image:
        'https://assets.coingecko.com/coins/images/28598/thumb/image002.png',
    },
  ],
};

export default defaultEVMTokens;
