'use server'

import { mediasService } from '@/services/mediasService';
import axios from 'axios';

export async function getMediaByNameAction(name: string) {
  try {
    return mediasService.getByName(name);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter a imagem');
    }

    throw new Error('Erro ao obter a imagem');
  }
}