'use server'

import { usersService } from '@/services/usersService';
import axios from 'axios';

export async function getUsersAction() {
  try {
    return usersService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os usuários');
    }

    throw new Error('Erro ao obter os usuários');
  }
}