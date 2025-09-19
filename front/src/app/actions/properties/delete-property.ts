'use server'

import { propertiesService } from '@/services/propertiesService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deletePropertyAction(id: string) {
  try {
    await propertiesService.remove(id)
    revalidatePath('/dashboard/properties')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o imóvel')
    }

    throw new Error('Erro desconhecido ao excluir o imóvel')
  }
}