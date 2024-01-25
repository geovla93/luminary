import React, {createContext, useContext, useMemo} from 'react';
import {MD3Theme, Provider} from 'react-native-paper';
import getTheme from '../../theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextProps {
  theme: MD3Theme;
}

const ThemeContext = createContext({} as any);

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const theme = useMemo<MD3Theme>(() => getTheme(), []);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
      }}>
      <Provider theme={theme}>{children}</Provider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
