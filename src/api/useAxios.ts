import axios from 'axios';
import {apiBaseUrl} from './config';
import {useAppSelector} from '@redux/hook';
import {useMemo} from 'react';

// import messages from '../i18n/en/messages';

const useAxios = () => {
  const {token} = useAppSelector(state => state.user);
  const headers = useMemo<any>(() => {
    const _h = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      authorization: '',
    };
    if (token) {
      _h.authorization = `Bearer ${token}`;
    }
  }, [token]);
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: headers,
  });

  // Use this to debug requests
  axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request', request.url);
    // console.log('Request Data', request.data);
    return request;
  });

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // console.log(error.response?.data.errors);
      if (error.response?.status === 401) {
        // see if the token must be set to null
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export default useAxios;
