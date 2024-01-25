import {IBlockchainDriver} from '@itypes/IBlockchainDriver';
import EthereumDriver from '../ethereum/EthereumWallet';

class BnbDriver extends EthereumDriver implements IBlockchainDriver {}

export default BnbDriver;
