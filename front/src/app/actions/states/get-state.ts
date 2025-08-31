'use server'

import { statesService } from '@/services/statesService';
import axios from 'axios';

export async function getStateAction(id: string) {
  try {
    return statesService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o estado');
    }

    throw new Error('Erro ao obter o estado');
  }
}