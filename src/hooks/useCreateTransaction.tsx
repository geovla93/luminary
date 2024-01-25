import {IBlockchain} from '@itypes/blockchain';
import React, {createContext, useContext, useState} from 'react';
import blockchains from 'src/blockchain';

interface ITransactionContext {
  chain: IBlockchain;
  amount: number;
  to: string;
  token: any;
  gas: any;
  setChain: (chain: IBlockchain) => void;
  setAmount: (amount: number) => void;
  setTo: (to: string) => void;
  setToken: (token: any) => void;
  setGas: (gas: any) => void;
  reset: () => void;
}

const TransactionContext = createContext<ITransactionContext>(
  {} as ITransactionContext,
);

const CreateTransactionProvider = ({children}: any) => {
  const [chain, setChain] = useState<IBlockchain>(blockchains.ETHEREUM);
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState('');
  const [token, setToken] = useState(null);
  const [gas, setGas] = useState(null);

  const reset = () => {
    setChain(blockchains.ETHEREUM);
    setAmount(0);
    setTo('');
    setToken(null);
    setGas(null);
  };
  return (
    <TransactionContext.Provider
      value={{
        chain,
        amount,
        to,
        token,
        gas,
        setChain,
        setAmount,
        setTo,
        setToken,
        setGas,
        reset,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default CreateTransactionProvider;

export const useCreateTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      'useCreateTransaction must be used within a CreateTransactionProvider',
    );
  }
  return context;
};
