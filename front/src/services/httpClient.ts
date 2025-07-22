import { localStoragekeys } from '@/config/localStorageKeys';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem(localStoragekeys.TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});