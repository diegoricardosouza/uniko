'use server'

import { statesService } from '@/services/statesService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteStateAction(id: string) {
  try {
    await statesService.remove(id)
    revalidatePath('/dashboard/properties/states')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o estado')
    }

    throw new Error('Erro desconhecido ao excluir o estado')
  }
}