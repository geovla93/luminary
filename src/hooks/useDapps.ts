import {IDapp} from '@itypes/dapps';
import {useAppDispatch, useAppSelector} from '@redux/hook';
import {_setDapps, _setFeatured, _setHot} from '@redux/slices/dapps.slice';
import {openLink} from '@utils/inAppBrowser';
import {useEffect} from 'react';

const MOCK_DAPPS = {
  featured: [
    {
      id: 1,
      url: 'https://opensea.io/',
      image:
        'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png',
      name: 'OpenSea',
      description: 'The largest NFT marketplace',
      categories: ['NFT'],
      featuredImage:
        'https://www.howusedapps.com/content/images/size/w2000/2023/04/opensea.webp',
      rating: 4.5,
      connectable: true,
    },
    {
      id: 2,
      url: 'https://pancakeswap.finance/',
      image: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
      featuredImage:
        'https://assets-global.website-files.com/606f63778ec431ec1b930f1f/607986d753127e14256005fd_PancakeSwap_CAKE_token-social.jpg',
      name: 'PancakeSwap',
      description: 'The largest AMM',
      categories: ['DEX'],
      rating: 5,
      connectable: true,
    },
    {
      id: 3,
      url: 'https://coinmarketcap.com/',
      image:
        'https://seeklogo.com/images/C/coinmarketcap-logo-064D167A0E-seeklogo.com.png',
      name: 'CoinMarketCap',
      description: 'The largest crypto market cap',
      categories: ['Market'],
      rating: 5,
      connectable: false,
    },
  ],
  dapps: [
    {
      id: 1,
      url: 'https://opensea.io/',
      image:
        'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png',
      name: 'OpenSea',
      description: 'The largest NFT marketplace',
      categories: ['NFT'],
      rating: 4.5,
      connectable: true,
    },
    {
      id: 2,
      url: 'https://pancakeswap.finance/',
      image: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png',
      name: 'PancakeSwap',
      description: 'The largest AMM',
      categories: ['DEX'],
      rating: 5,
      connectable: true,
    },
    {
      id: 3,
      url: 'https://coinmarketcap.com/',
      image:
        'https://seeklogo.com/images/C/coinmarketcap-logo-064D167A0E-seeklogo.com.png',
      name: 'CoinMarketCap',
      description: 'Market info',
      categories: ['Market'],
      rating: 5,
      connectable: false,
    },
    {
      id: 4,
      url: 'https://app.uniswap.org/',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png',
      name: 'Uniswap',
      description: 'DEX',
      categories: ['DEX'],
      rating: 5,
      connectable: true,
    },
  ],
  hot: [
    {
      id: 3,
      url: 'https://coinmarketcap.com/',
      image:
        'https://seeklogo.com/images/C/coinmarketcap-logo-064D167A0E-seeklogo.com.png',
      name: 'CoinMarketCap',
      description: 'The largest crypto market cap',
      categories: ['Market'],
      rating: 5,
      connectable: false,
    },
  ],
};

const useDapps = () => {
  const dapps = useAppSelector(state => state.dapps);
  const dispatch = useAppDispatch();

  const setDapps = (_dapps: any) => {
    dispatch(_setDapps(_dapps));
  };

  const setFeatured = (_featured: any) => {
    dispatch(_setFeatured(_featured));
  };

  const setHot = (_hot: any) => {
    dispatch(_setHot(_hot));
  };

  useEffect(() => {
    setDapps(MOCK_DAPPS.dapps);
    setFeatured(MOCK_DAPPS.featured);
    setHot(MOCK_DAPPS.dapps);
  }, []);

  const openDapp = (dapp: IDapp) => {
    openLink(dapp.url);
  };

  return {
    dapps: dapps.dapps,
    featured: dapps.featured,
    hot: dapps.hot,
    setDapps,
    openDapp,
  };
};

export default useDapps;
