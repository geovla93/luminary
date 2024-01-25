import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {setHideZeroBalance, setTokenSort} from '@redux/slices/tokens.slice';
import {IToken, SortTokenBy} from '@itypes/token';
import TokenToolbox from './ToolBox';

interface ITokenToolboxContext {
  filteredTokens: IToken[];
  showTokenToolbox: boolean;
  setShowTokenToolbox: (show: boolean) => void;
  handleChangeSortBy: (sortBy: SortTokenBy) => void;
}

const TokenToolboxContext = createContext<ITokenToolboxContext>(
  {} as ITokenToolboxContext,
);

interface ITokenToolboxProvider {
  children: React.ReactNode;
}

const AssetsToolboxProvider = ({children}: ITokenToolboxProvider) => {
  const dispatch = useAppDispatch();
  const {current} = useAppSelector(state => state.wallet);
  const tokenBottomSheetRef = useRef<any>(null);
  const {tokens, sortBy, hideZeroBalance} = useAppSelector(
    state => state.tokens,
  );
  const [filteredTokens, setFilteredTokens] = useState<IToken[]>([]);
  const [showTokenToolbox, setShowTokenToolbox] = useState(false);

  const toggleZeroBalanceHide = () => {
    dispatch(setHideZeroBalance(hideZeroBalance ? false : true));
  };

  const filterAndSortTokens = () => {
    if (!tokens[current]) {
      return;
    }

    let _tokens = [...tokens[current]];

    const comparePrice = (a: IToken, b: IToken) =>
      (b?.price?.usd ?? 0) - (a?.price?.usd ?? 0);
    const compareName = (a: IToken, b: IToken) => a.name.localeCompare(b.name);
    const compareBalance = (a: IToken, b: IToken) =>
      Number(b.balance) * b?.price?.usd - Number(a.balance) * a?.price?.usd ||
      0;

    if (sortBy === 'price') {
      _tokens.sort(comparePrice);
    } else if (sortBy === 'name') {
      _tokens.sort(compareName);
    } else if (sortBy === 'value') {
      _tokens.sort(compareBalance);
    }

    if (hideZeroBalance) {
      _tokens = _tokens.filter(token => Number(token.balance) > 0);
    }
    // remove tokens with visibility false
    _tokens = _tokens.filter(token => token.visible);
    setFilteredTokens(_tokens);
  };

  useEffect(() => {
    filterAndSortTokens();
  }, [tokens, current, sortBy, hideZeroBalance]);

  const handleChangeSortBy = (_sortBy: SortTokenBy) => {
    dispatch(setTokenSort(_sortBy));
    handleToolboxClose();
  };

  const handleToolboxClose = () => {
    tokenBottomSheetRef.current?.close();
    setTimeout(() => {
      setShowTokenToolbox(false);
    }, 500);
  };

  return (
    <TokenToolboxContext.Provider
      value={{
        filteredTokens,
        showTokenToolbox,
        setShowTokenToolbox,
        handleChangeSortBy,
      }}>
      {children}
      {showTokenToolbox && (
        <TokenToolbox
          toggleShowZeroBalance={toggleZeroBalanceHide}
          selected={sortBy}
          hideZeroBalance={hideZeroBalance}
          onSortSelect={handleChangeSortBy}
          sheetRef={tokenBottomSheetRef}
          onClose={handleToolboxClose}
        />
      )}
    </TokenToolboxContext.Provider>
  );
};

export const useAssetsToolbox = () => {
  return useContext(TokenToolboxContext);
};

export default AssetsToolboxProvider;
