import {useState} from 'react';

interface IChangeWalletPin {
  loading: boolean;
  error: boolean;
  changeWalletPin: (oldPin: string, newPin: string) => void;
}

const useChangeWalletPin = (): IChangeWalletPin => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const changeWalletPin = async (oldPin: string, newPin: string) => {};
  return {
    loading,
    error,
    changeWalletPin,
  };
};

export default useChangeWalletPin;
