import {IBlockchain} from '@itypes/blockchain';
import {IToken} from '@itypes/token';
import React, {createContext, useContext, useEffect, useState} from 'react';
import blockchains from 'src/blockchain';
import useTokens from './useTokens';
import {useWalletContext} from './useWalletContext';

interface ITransactionContext {
  step: number;
  chain: IBlockchain;
  amount: number;
  to: string;
  token: IToken;
  gas: any;
  setChain: (chain: IBlockchain) => void;
  setAmount: (amount: number) => void;
  setTo: (to: string) => void;
  setToken: (token: any) => void;
  setGas: (gas: any) => void;
  reset: () => void;
  cancelTransfer: () => void;
  setStep: (step: number) => void;
  tokens: IToken[];
}

const TransactionContext = createContext<ITransactionContext>(
  {} as ITransactionContext,
);

const CreateTransactionProvider = ({children}: any) => {
  const [step, setStep] = useState(0);
  const {chains} = useWalletContext();
  const [chain, setChain] = useState<IBlockchain>(chains[2]);
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState('');
  const [token, setToken] = useState<IToken>({} as IToken);
  const [gas, setGas] = useState(null);
  const tokensData = useTokens();
  const [tokens, setTokens] = useState<IToken[]>([]);

  useEffect(() => {
    if (chain) {
      const chainTokens = tokensData.tokens.filter(
        _token => _token.chain === chain.shortName,
      );
      setTokens(chainTokens);

      setToken(chainTokens[2]);
    }
  }, [chain]);

  const cancelTransfer = () => {
    reset();
    // etc...
  };

  const reset = () => {
    setChain(chains[2]);
    setAmount(0);
    setTo('');
    setToken({} as IToken);
    setGas(null);
    setStep(0);
  };

  return (
    <TransactionContext.Provider
      value={{
        step,
        chain,
        amount,
        to,
        token,
        tokens,
        gas,
        setChain,
        setAmount,
        setTo,
        setToken,
        setGas,
        reset,
        cancelTransfer,
        setStep,
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
