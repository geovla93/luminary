import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import EthereumDriver from '../ethereum/EthereumWallet';

class PolygonDriver extends EthereumDriver implements IBlockchainDriver {}

export default PolygonDriver;
