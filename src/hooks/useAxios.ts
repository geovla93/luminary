import axios from 'axios';
import {apiBaseUrl} from '../api/config';

// import messages from '../i18n/en/messages';

const useAxios = () => {
  // const token = useAppSelector(state => state.member.token);
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      // authorization: `Bearer ${token}`,
    },
  });

  // Use this to debug requests
  axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request', apiBaseUrl + request.url);
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
        // logout();
        // dispatch(logoutAction());
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

export default useAxios;
