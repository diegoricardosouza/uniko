/* eslint-disable @typescript-eslint/no-explicit-any */
import { localStoragekeys } from '@/config/localStorageKeys';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor de request atualizado para trabalhar com Auth.js
httpClient.interceptors.request.use(async (config) => {
  // Primeiro, tenta pegar o token do localStorage (compatibilidade)
  let token = localStorage.getItem(localStoragekeys.TOKEN);

  // Se não encontrou no localStorage, pega da sessão do Auth.js
  if (!token) {
    const session = await getSession();
    const typedSession = session as any;
    token = typedSession?.accessToken;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response para lidar com tokens expirados
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Remove token inválido do localStorage
      localStorage.removeItem(localStoragekeys.TOKEN);

      // Redireciona para login se necessário
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Função para definir token manualmente (útil para compatibilidade)
export const setAuthToken = (token: string) => {
  localStorage.setItem(localStoragekeys.TOKEN, token);
};

// Função para remover token
export const removeAuthToken = () => {
  localStorage.removeItem(localStoragekeys.TOKEN);
};