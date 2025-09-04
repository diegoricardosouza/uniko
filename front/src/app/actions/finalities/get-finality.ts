'use server'

import { finalitiesService } from '@/services/finalitiesService';
import axios from 'axios';

export async function getFinalityAction(id: string) {
  try {
    return finalitiesService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter a finalidade');
    }

    throw new Error('Erro ao obter a finalidade');
  }
}