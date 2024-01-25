import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import EthereumDriver from '../ethereum/EthereumWallet';

class MantaWallet extends EthereumDriver implements IBlockchainDriver {}

export default MantaWallet;
