'use server'

import { neighborhoodsService } from '@/services/neighborhoodsService';
import axios from 'axios';

export async function getNeighborhoodAction(id: string) {
  try {
    return neighborhoodsService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o bairro');
    }

    throw new Error('Erro ao obter o bairro');
  }
}