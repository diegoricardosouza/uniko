'use server'

import { settingsService } from '@/services/settingsService';
import axios from 'axios';

export async function getSettingAction(id: string) {
  try {
    return settingsService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o item');
    }

    throw new Error('Erro ao obter o item');
  }
}