import React, {createContext, useContext, ReactNode} from 'react';

interface BregSaysContextProps {}

const BregSaysContext = createContext<BregSaysContextProps>(
  {} as BregSaysContextProps,
);

interface BregSaysProps {
  children: ReactNode;
}

const BregSays = ({children}: BregSaysProps) => {
  return (
    <BregSaysContext.Provider value={{}}>{children}</BregSaysContext.Provider>
  );
};

export const useBregSays = () => useContext(BregSaysContext);

export default BregSays;
