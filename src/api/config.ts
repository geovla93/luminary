import axios from 'axios';

export const apiBaseUrl = __DEV__
  ? 'https://api.iluminary.app/api/v1'
  : 'https://api.iluminary.app/api/v1';

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;
