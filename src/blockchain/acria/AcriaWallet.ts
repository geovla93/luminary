import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import EthereumDriver from '../ethereum/EthereumWallet';

class AcriaDriver extends EthereumDriver implements IBlockchainDriver {}

export default AcriaDriver;
