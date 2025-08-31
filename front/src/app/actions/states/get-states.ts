'use server'

import { statesService } from '@/services/statesService';
import axios from 'axios';

export async function getStatesAction() {
  try {
    return statesService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os estados');
    }

    throw new Error('Erro ao obter os estados');
  }
}