import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import EthereumDriver from '../ethereum/EthereumWallet';

class ArbitrumDriver extends EthereumDriver implements IBlockchainDriver {}

export default ArbitrumDriver;
