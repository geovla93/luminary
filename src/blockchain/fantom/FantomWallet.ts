import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import EthereumDriver from '../ethereum/EthereumWallet';

class FantomWallet extends EthereumDriver implements IBlockchainDriver {}

export default FantomWallet;
