'use server'

import { neighborhoodsService } from '@/services/neighborhoodsService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteNeighborhoodAction(id: string) {
  try {
    await neighborhoodsService.remove(id)
    revalidatePath('/dashboard/properties/neighborhoods')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o bairro')
    }

    throw new Error('Erro desconhecido ao excluir o bairro')
  }
}