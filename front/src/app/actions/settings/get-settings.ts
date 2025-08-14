'use server'

import { settingsService } from '@/services/settingsService';
import axios from 'axios';

export async function getSettingsAction() {
  try {
    return settingsService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os itens');
    }

    throw new Error('Erro ao obter os itens');
  }
}