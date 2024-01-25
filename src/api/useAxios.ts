import axios from 'axios';
import {useAppSelector} from '@redux/hook';
import {useEffect} from 'react';
import {apiBaseUrl} from 'src/api/config';

const useAxios = () => {
  const {token} = useAppSelector(state => state.user);

  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      request => {
        if (token) {
          request.headers.authorization = `Bearer ${token}`;
        }
        return request;
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [token, axiosInstance]);

  return axiosInstance;
};

export default useAxios;
