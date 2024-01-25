import React from 'react';
import {IDerivationPath} from 'src/blockchain/derivationPath';
import Bip44Input from './components/Bip44Input';
import EthereumLegacyInput from './components/EthereumLegacyInput';
import CustomPathInput from './components/CustomPathInput';
import LedgerLiveInput from './components/LedgerLiveInput';

interface IProps {
  derivationPath: IDerivationPath;
  onChange: (value: string) => void;
}

const DerivationPathInput = ({derivationPath, onChange}: IProps) => {
  if (derivationPath.type === 'bip44') {
    return <Bip44Input onChange={onChange} />;
  }
  if (derivationPath.type === 'ledgerLive') {
    return <LedgerLiveInput onChange={onChange} />;
  }
  if (derivationPath.type === 'legacy') {
    return <EthereumLegacyInput onChange={onChange} />;
  }
  if (derivationPath.type === 'custom') {
    return <CustomPathInput onChange={onChange} />;
  }

  return null;
};

export default DerivationPathInput;
