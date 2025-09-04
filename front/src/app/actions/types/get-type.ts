'use server'

import { typesService } from '@/services/typesService';
import axios from 'axios';

export async function getTypeAction(id: string) {
  try {
    return typesService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o tipo');
    }

    throw new Error('Erro ao obter o tipo');
  }
}