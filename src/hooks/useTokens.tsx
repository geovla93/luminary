import React, {createContext, useCallback, useContext, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {getPrices} from '../api/wallet';
import {
  setTokens,
  setTokenPrices,
  setTokenIds,
  changeTokenVisibility,
} from '@redux/slices/tokens.slice';
import {setTotals} from '@redux/slices/wallet.slice';
import {IToken} from '@itypes/token';
import {useWalletContext} from './useWalletContext';
import {IBlockchain} from '@itypes/blockchain';
import useAxios from 'src/api/useAxios';

interface ITokensContext {
  tokens: IToken[];
  tokenPrices: {[key: string]: {usd: number; usd_24h_change: number}};
  tokenIds: string[];
  setInitialTokens: (tokens: IToken[], tokenIds: string[]) => void;
  refreshPrices: () => Promise<void>;
  refreshBalances: () => Promise<void>;
  refreshTokenBalance: (token: IToken) => Promise<IToken>;
  remoteSearchTokens: (search: string) => Promise<any>;
  toggleTokenVisibility: (token: IToken) => Promise<any>;
}
const TokensContext = createContext<ITokensContext>({} as ITokensContext);

export const PricesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const axios = useAxios();
  const {current} = useAppSelector(state => state.wallet);
  const {currency} = useAppSelector(state => state.application);
  const tokensData = useAppSelector(state => state.tokens);
  const {chains} = useWalletContext();

  const tokenIds = tokensData.tokenIds[current];

  const calculateTotals = useCallback(() => {
    const tokens = tokensData.tokens[current];
    let currentBalance = 0;
    let previousBalance = 0;

    tokens?.forEach((token: IToken) => {
      const price = token.price;
      const balance = Number(token.balance);

      if (price && price[currency]) {
        currentBalance += price[currency] * balance;

        const change24h = price[`${currency}_24h_change`];
        const previousPrice = price[currency] / (1 + change24h / 100);
        previousBalance += previousPrice * balance;
      }
    });

    const profit = currentBalance - previousBalance;
    const changePercentage = (profit / previousBalance) * 100;

    dispatch(
      setTotals({balance: currentBalance, profit, change: changePercentage}),
    );
  }, [tokensData, current, currency]);

  const refreshPrices = useCallback(async () => {
    try {
      if (!tokenIds || tokenIds.length === 0) {
        return;
      }
      const prices = await getPrices(tokenIds.join(','));
      const theTokens: IToken[] = [];

      tokensData.tokens[current].forEach((token: IToken) => {
        const priceData = prices.data[token.id];
        if (priceData) {
          theTokens.push({...token, price: priceData});
        }
      });
      dispatch(setTokens({walletKey: current, tokens: theTokens}));
      dispatch(setTokenPrices(prices.data));
    } catch (error) {
      console.error('Failed to refresh prices:', error);
    }
  }, [tokenIds, tokensData.tokens, current, currency]);

  const getTokenDescription = ({
    address,
    symbol,
    contractAddress,
    chain,
  }: {
    address: string;
    symbol: string;
    contractAddress: string;
    chain: string;
  }) => {
    return axios.get('/tokens/get', {
      params: {
        address,
        symbol,
        contractAddress,
        chain,
      },
    });
  };

  const addTokenToWallet = useCallback(
    (tokenData: IToken, tokenId: string) => {
      const tokens = [...tokensData.tokens[current]];
      tokenData.price = {};
      tokens.push(tokenData);
      const ids = [...tokenIds];
      const idIndex = ids.findIndex(id => id === tokenId);
      if (idIndex === -1) {
        ids.push(tokenId);
        dispatch(setTokenIds({walletKey: current, tokenIds: ids}));
      }
      dispatch(setTokens({walletKey: current, tokens}));
    },
    [tokenIds, tokensData.tokens, current],
  );

  const toggleTokenVisibility = useCallback(
    async (token: any): Promise<any> => {
      let tokens = tokensData.tokens[current];

      const tokenIndex = tokens.findIndex(
        (_token: any) =>
          _token.id === token.id &&
          _token.contractAddress === token.contractAddress &&
          _token.chainId === token.chainId,
      );

      if (tokenIndex === -1) {
        const chainData = chains.find(
          (_chain: IBlockchain) => _chain.shortName === token.chainId,
        );
        if (chainData) {
          const {data} = await getTokenDescription({
            address: chainData.address as string,
            symbol: token.symbol,
            contractAddress: token.contractAddress,
            chain: token.chainId,
          });
          const {token: dbToken, tokenId} = data;
          // Add token to list
          addTokenToWallet(dbToken, tokenId);
        }
        // Call API to add token
      } else {
        // Change visibility
        dispatch(
          changeTokenVisibility({
            walletKey: current,
            tokenIndex,
            visible: !tokens[tokenIndex].visible,
          }),
        );
      }
    },
    [tokensData.tokens, current],
  );

  const setInitialTokens = (tokens: IToken[], ids: string[]) => {
    const tokenList = tokens.map(token => ({
      ...token,
      price: {},
    }));

    dispatch(setTokenIds({walletKey: current, tokenIds: ids}));
    dispatch(setTokens({walletKey: current, tokens: tokenList}));
  };

  const getTokenBalance = useCallback(
    async (token: IToken) => {
      const chain = chains.find(
        (_chain: IBlockchain) => _chain.shortName === token.chain,
      );

      if (chain) {
        const Driver = chain.walletDriver;
        const driver = new Driver(chain.address, chain);
        const balance = await driver.getTokenBalance(token);

        return balance;
      }
      return '0';
    },
    [chains],
  );

  const refreshTokenBalance = async (token: IToken) => {
    const balance = await getTokenBalance(token);
    token.balance = balance;
    return token;
  };

  const refreshBalances = async () => {
    const tokens = tokensData.tokens[current];
    tokens.forEach(async (token: IToken, index: number) => {
      try {
        const balance = await getTokenBalance(token);
        tokens[index].balance = balance;
      } catch (error) {
        console.log('Failed to refresh balance:', error);
      }
    });
    dispatch(setTokens({walletKey: current, tokens: tokens}));
  };

  useEffect(() => {
    if (current) {
      calculateTotals();
    }
  }, [tokensData, current, currency]);

  const remoteSearchTokens = async (search: string) => {
    return axios.get('/tokens/find', {
      params: {
        search,
      },
    });
  };

  return (
    <TokensContext.Provider
      value={{
        tokenIds,
        tokens: tokensData.tokens[current],
        tokenPrices: tokensData.tokenPrices,
        toggleTokenVisibility,
        setInitialTokens,
        refreshPrices,
        refreshBalances,
        refreshTokenBalance,
        remoteSearchTokens,
      }}>
      {children}
    </TokensContext.Provider>
  );
};

const useTokens = () => {
  const context = useContext(TokensContext);
  if (!context) {
    throw new Error('useTokens must be used within a TokensContextProvider');
  }
  return context;
};

export default useTokens;
