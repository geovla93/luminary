import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {getPrices} from '../api/wallet';
import {
  setTokens,
  setTokenPrices,
  setTokenIds,
} from '@redux/slices/tokens.slice';
import {setTotals} from '@redux/slices/wallet.slice';
import {IToken} from '@itypes/token';

interface ITokensContext {
  tokens: IToken[];
  tokenPrices: {[key: string]: {usd: number; usd_24h_change: number}};
  tokenIds: string[];
  setInitialTokens: (tokens: IToken[], tokenIds: string[]) => void;
  refreshPrices: () => Promise<void>;
}

const useTokens = (): ITokensContext => {
  const dispatch = useAppDispatch();
  const {current} = useAppSelector(state => state.wallet);
  const tokensData = useAppSelector(state => state.tokens);
  const tokenIds = tokensData.tokenIds[current];

  const refreshPrices = useCallback(async () => {
    try {
      if (!tokenIds || tokenIds.length === 0) {
        return;
      }
      const prices = await getPrices(tokenIds.join(','));
      const theTokens: IToken[] = [];
      let total = 0;

      tokensData.tokens[current].forEach((token: IToken) => {
        const priceData = prices.data[token.id];
        if (priceData) {
          total += priceData.usd * Number(token.balance);
          theTokens.push({...token, price: priceData});
        }
      });

      dispatch(setTokens({walletKey: current, tokens: theTokens}));
      dispatch(setTokenPrices(prices.data));
      dispatch(setTotals({balance: total, profit: 0, change: 0}));
    } catch (error) {
      console.error('Failed to refresh prices:', error);
    }
  }, [tokenIds, tokensData.tokens, current]);

  const setInitialTokens = (tokens: IToken[], ids: string[]) => {
    const tokenList = tokens.map(token => ({
      ...token,
      price: {
        usd: 0,
        usd_24h_change: 0,
      },
    }));

    dispatch(setTokenIds({walletKey: current, tokenIds: ids}));
    dispatch(setTokens({walletKey: current, tokens: tokenList}));
  };

  return {
    tokenIds,
    tokens: tokensData.tokens[current],
    tokenPrices: tokensData.tokenPrices,
    setInitialTokens,
    refreshPrices,
  };
};

export default useTokens;
