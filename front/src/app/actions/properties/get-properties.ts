'use server'

import { propertiesService } from '@/services/propertiesService';
import axios from 'axios';

export async function getPropertiesAction() {
  try {
    return propertiesService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os imóveis');
    }

    throw new Error('Erro ao obter os imóveis');
  }
}