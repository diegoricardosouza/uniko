'use server'

import { propertiesService } from '@/services/propertiesService';
import axios from 'axios';

export async function getPropertyAction(id: string) {
  try {
    return propertiesService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o imóvel');
    }

    throw new Error('Erro ao obter o imóvel');
  }
}