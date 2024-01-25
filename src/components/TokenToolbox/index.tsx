import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {setTokenSearch, setTokenSort} from '@redux/slices/tokens.slice';
import {IToken, SortTokenBy} from '@itypes/token';
import TokenToolbox from './ToolBox';

interface ITokenToolboxContext {
  filteredTokens: IToken[];
  tokenSearch: string;
  showTokenToolbox: boolean;
  setShowTokenToolbox: (show: boolean) => void;
  changeTokenSearch: (search: string) => void;
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
  const {search, tokens, sortBy} = useAppSelector(state => state.tokens);
  const [filteredTokens, setFilteredTokens] = useState<IToken[]>([]);
  const [showTokenToolbox, setShowTokenToolbox] = useState(false);

  const filterAndSortTokens = () => {
    if (!tokens[current]) {
      return;
    }

    let _tokens = [...tokens[current]];

    if (search !== '') {
      _tokens = _tokens.filter(
        token =>
          token.name.toLowerCase().includes(search?.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search?.toLowerCase()),
      );
    }

    const comparePrice = (a: IToken, b: IToken) =>
      (b.price.usd ?? 0) - (a.price.usd ?? 0);
    const compareName = (a: IToken, b: IToken) => a.name.localeCompare(b.name);
    const compareBalance = (a: IToken, b: IToken) =>
      Number(b.balance) * b.price.usd - Number(a.balance) * a.price.usd || 0;

    if (sortBy === 'price') {
      _tokens.sort(comparePrice);
    } else if (sortBy === 'name') {
      _tokens.sort(compareName);
    } else if (sortBy === 'value') {
      _tokens.sort(compareBalance);
    }

    setFilteredTokens(_tokens);
  };
  useEffect(() => {
    filterAndSortTokens();
  }, [tokens, current, search, sortBy]);

  const handleChangeSortBy = (_sortBy: SortTokenBy) => {
    dispatch(setTokenSort(_sortBy));
    handleToolboxClose();
  };

  const changeTokenSearch = (_search: string) => {
    dispatch(setTokenSearch(_search));
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
        tokenSearch: search,
        showTokenToolbox,
        setShowTokenToolbox,
        changeTokenSearch,
        handleChangeSortBy,
      }}>
      {children}
      {showTokenToolbox && (
        <TokenToolbox
          selected={sortBy}
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
