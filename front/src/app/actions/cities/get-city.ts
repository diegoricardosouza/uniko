'use server'

import { citiesService } from '@/services/citiesService';
import axios from 'axios';

export async function getCityAction(id: string) {
  try {
    return citiesService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter a cidade');
    }

    throw new Error('Erro ao obter a cidade');
  }
}