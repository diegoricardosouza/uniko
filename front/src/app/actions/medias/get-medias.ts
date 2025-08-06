'use server'

import { mediasService } from '@/services/mediasService';
import axios from 'axios';

export async function getMediaAction() {
  try {
    return mediasService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter midias');
    }

    throw new Error('Erro ao obter midias');
  }
}