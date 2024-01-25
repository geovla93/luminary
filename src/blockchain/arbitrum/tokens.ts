import {Blockchain} from '@itypes/blockchain';
import {IToken, TokenType} from '@itypes/token';

const polygonTokens: IToken[] = [
  {
    name: 'Matic',
    symbol: 'MATIC',
    type: TokenType.NATIVE,
    decimals: 18,
    chain: Blockchain.POLYGON,
  },
  {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    type: TokenType.ERC20,
    contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    chain: Blockchain.POLYGON,
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    type: TokenType.ERC20,
    contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    chain: Blockchain.POLYGON,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    type: TokenType.ERC20,
    contractAddress: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
    decimals: 18,
    chain: Blockchain.POLYGON,
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    type: TokenType.ERC20,
    contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    decimals: 6,
    chain: Blockchain.POLYGON,
  },
  {
    name: 'ChainLink',
    symbol: 'LINK',
    type: TokenType.ERC20,
    contractAddress: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
    decimals: 18,
    chain: Blockchain.POLYGON,
  },
];

export default polygonTokens;
