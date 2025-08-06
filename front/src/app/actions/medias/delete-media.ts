'use server'

import { mediasService } from '@/services/mediasService';
import axios from 'axios';

export async function deleteMediaAction(id: string) {
  try {
    return mediasService.remove(id)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir usuário')
    }

    throw new Error('Erro desconhecido ao excluir usuário')
  }
}