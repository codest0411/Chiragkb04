import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  withCredentials: false,
});

export const extractData = (response) => response?.data?.data ?? response?.data ?? [];

export const fetcher = async (url) => {
  const response = await api.get(url);
  return extractData(response);
};

export default api;
