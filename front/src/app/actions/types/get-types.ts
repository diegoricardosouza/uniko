'use server'

import { typesService } from '@/services/typesService';
import axios from 'axios';

export async function getTypesAction() {
  try {
    return typesService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os tipos');
    }

    throw new Error('Erro ao obter os tipos');
  }
}