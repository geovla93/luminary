import * as acria from './acria/network';
import * as bnb from './bnb/network';
import * as polygon from './polygon/network';
import * as ethereum from './ethereum/network';
import {Blockchain, IBlockchains} from '@itypes/blockchain';
import AcriaDriver from './acria/AcriaWallet';
import BnbDriver from './bnb/BnbWallet';
import EthereumDriver from './ethereum/EthereumWallet';
import PolygonDriver from './polygon/PolygonWallet';

const blockchains: IBlockchains = {
  [Blockchain.ACRIA]: {
    id: 47,
    shortName: Blockchain.ACRIA,
    name: 'Acria IntelliChain',
    image: require('./acria/logo.png'),
    walletDriver: AcriaDriver,
    mode: 'evm',
    networks: {
      mainnet: acria.mainnet,
      testnet: acria.testnet,
    },
  },
  [Blockchain.BNB]: {
    id: 56,
    shortName: Blockchain.BNB,
    name: 'Binance Smart Chain',
    image: require('./bnb/logo.png'),
    mode: 'evm',
    walletDriver: BnbDriver,
    networks: {
      mainnet: bnb.mainnet,
      testnet: bnb.testnet,
    },
  },
  [Blockchain.ETHEREUM]: {
    id: 1,
    shortName: Blockchain.ETHEREUM,
    name: 'Ethereum',
    image: require('./ethereum/logo.png'),
    mode: 'evm',
    walletDriver: EthereumDriver,
    networks: {
      mainnet: ethereum.mainnet,
      testnet: ethereum.testnet,
    },
  },
  [Blockchain.POLYGON]: {
    id: 137,
    shortName: Blockchain.POLYGON,
    name: 'Polygon',
    image: require('./polygon/logo.png'),
    mode: 'evm',
    walletDriver: PolygonDriver,
    networks: {
      mainnet: polygon.mainnet,
      testnet: polygon.testnet,
    },
  },
};

export const EVM_CHAINS: Blockchain[] = [
  Blockchain.ACRIA,
  Blockchain.BNB,
  Blockchain.ETHEREUM,
  Blockchain.POLYGON,
];

export default blockchains;
