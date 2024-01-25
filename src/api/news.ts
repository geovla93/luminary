import axios from './config';

export const getNews = (search: string) =>
  axios.get('/news/all', {params: {search}});

export const getFeatured = () => axios.get('/news/featured');
export const getNewsByToken = async (token: string) => {
  const url = `/news/view/${token}`;
  return await axios.get(url);
};
