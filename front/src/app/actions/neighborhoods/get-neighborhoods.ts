'use server'

import { neighborhoodsService } from '@/services/neighborhoodsService';
import axios from 'axios';

export async function getNeighborhoodsAction() {
  try {
    return neighborhoodsService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os bairros');
    }

    throw new Error('Erro ao obter os bairros');
  }
}