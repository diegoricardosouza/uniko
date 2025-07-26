'use server'

import { usersService } from '@/services/usersService';
import axios from 'axios';

export async function getUserAction(id: string) {
  try {
    return usersService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter usuário');
    }

    throw new Error('Erro ao obter usuário');
  }
}