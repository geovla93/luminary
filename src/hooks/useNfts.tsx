import {useCallback, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/hook';

import {useWalletContext} from './useWalletContext';
import useAxios from 'src/api/useAxios';
import {setNFTBlockchain, setNFTCollections} from '@redux/slices/nfts.slice';
import {Blockchain, IBlockchain} from '@itypes/blockchain';
import Erc721 from 'src/blockchain/ethereum/Erc721';

const useNfts = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {collections, blockchain} = useAppSelector(state => state.nfts);
  const {current, chains, walletPairs} = useWalletContext();

  const nftChains = useMemo(() => {
    return Object.values(chains).filter(
      (chain: any) => chain.hasNFTs && chain.enabled,
    );
  }, [current]);

  const getUserNfts = async () => {
    const address = walletPairs[current].address;
    return axios.get(`/nfts/${address}`).then((res: any) => {
      if (res.data.collections) {
        dispatch(setNFTCollections(res.data.collections));
      }
    });
  };

  const switchChain = (chain: Blockchain) => {
    dispatch(setNFTBlockchain(chain));
  };

  const getChainCollection = useCallback(() => {
    return collections[blockchain];
  }, [collections, blockchain]);

  const getCollectionBalance = async (contract: string) => {
    const chain = chains.find((_chain: any) => _chain.shortName === blockchain);

    const address = walletPairs[current].address;

    const service = new Erc721(address, chain as IBlockchain);
    return await service.getBalance(contract);
  };

  const getAddressNfts = async (
    contract: string,
    page: number,
    perPage: number,
  ) => {
    const chain = chains.find((_chain: any) => _chain.shortName === blockchain);

    const address = walletPairs[current].address;
    const service = new Erc721(address, chain as IBlockchain);
    return await service.getNftsPaginated(contract, page, perPage);
  };

  const getCollectionNfts = async (
    contract: string,
    page: number,
    perPage: number,
  ) => {
    const chain = chains.find((_chain: any) => _chain.shortName === blockchain);

    const address = walletPairs[current].address;
    const service = new Erc721(address, chain as IBlockchain);
    return await service.paginateAllNfts(contract, page, perPage);
  };

  return {
    collections,
    blockchain,
    nftChains,
    getChainCollection,
    getUserNfts,
    switchChain,
    getAddressNfts,
    getCollectionBalance,
    getCollectionNfts,
  };
};

export default useNfts;
