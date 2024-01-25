import * as acria from './acria/network';
import * as bnb from './bnb/network';
import * as polygon from './polygon/network';
import * as ethereum from './ethereum/network';
import * as fantom from './fantom/network';
import * as manta from './manta/network';
import * as arbitrum from './arbitrum/network';
import {Blockchain, IBlockchains} from '@itypes/blockchain';
import AcriaDriver from './acria/AcriaWallet';
import BnbDriver from './bnb/BnbWallet';
import EthereumDriver from './ethereum/EthereumWallet';
import PolygonDriver from './polygon/PolygonWallet';
import FantomWallet from './fantom/FantomWallet';
import MantaWallet from './manta/MantaWallet';
import ArbitrumDriver from './arbitrum/ArbitrumDriver';

const blockchains: IBlockchains = {
  [Blockchain.ETHEREUM]: {
    id: 1,
    shortName: Blockchain.ETHEREUM,
    name: 'Ethereum',
    image: require('./ethereum/logo.png'),
    hasNFTs: true,
    mode: 'evm',
    enabled: true,
    walletDriver: EthereumDriver,
    networks: {
      mainnet: ethereum.mainnet,
      testnet: ethereum.testnet,
    },
  },
  [Blockchain.BNB]: {
    id: 56,
    shortName: Blockchain.BNB,
    name: 'Binance Smart Chain',
    hasNFTs: true,
    image: require('./bnb/logo.png'),
    mode: 'evm',
    walletDriver: BnbDriver,
    enabled: true,
    networks: {
      mainnet: bnb.mainnet,
      testnet: bnb.testnet,
    },
  },
  [Blockchain.ARBITRUM]: {
    id: 42161,
    shortName: Blockchain.ARBITRUM,
    name: 'Arbitrum',
    hasNFTs: false,
    image: require('./arbitrum/logo.webp'),
    mode: 'evm',
    walletDriver: ArbitrumDriver,
    enabled: true,
    networks: {
      mainnet: arbitrum.mainnet,
      testnet: arbitrum.testnet,
    },
  },
  [Blockchain.POLYGON]: {
    id: 137,
    shortName: Blockchain.POLYGON,
    name: 'Polygon',
    hasNFTs: true,
    image: require('./polygon/logo.png'),
    mode: 'evm',
    enabled: true,
    walletDriver: PolygonDriver,
    networks: {
      mainnet: polygon.mainnet,
      testnet: polygon.testnet,
    },
  },
  [Blockchain.MANTA]: {
    id: 169,
    shortName: Blockchain.MANTA,
    name: 'Manta Pacific',
    hasNFTs: false,
    image: require('./manta/logo.webp'),
    walletDriver: MantaWallet,
    mode: 'evm',
    enabled: true,
    networks: {
      mainnet: manta.mainnet,
      testnet: manta.testnet,
    },
  },
  [Blockchain.FANTOM]: {
    id: 250,
    shortName: Blockchain.FANTOM,
    name: 'Fantom',
    hasNFTs: false,
    image: require('./fantom/logo.webp'),
    mode: 'evm',
    enabled: true,
    walletDriver: FantomWallet,
    networks: {
      mainnet: fantom.mainnet,
      testnet: fantom.testnet,
    },
  },
  [Blockchain.ACRIA]: {
    id: 47,
    shortName: Blockchain.ACRIA,
    name: 'Acria IntelliChain',
    hasNFTs: false,
    image: require('./acria/logo.png'),
    walletDriver: AcriaDriver,
    mode: 'evm',
    enabled: true,
    networks: {
      mainnet: acria.mainnet,
      testnet: acria.testnet,
    },
  },
};

export const EVM_CHAINS: Blockchain[] = [
  Blockchain.ACRIA,
  Blockchain.BNB,
  Blockchain.ETHEREUM,
  Blockchain.POLYGON,
  Blockchain.FANTOM,
  Blockchain.MANTA,
  Blockchain.ARBITRUM,
];

export default blockchains;
