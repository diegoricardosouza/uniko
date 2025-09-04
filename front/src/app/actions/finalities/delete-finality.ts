'use server'

import { finalitiesService } from '@/services/finalitiesService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteFinalityAction(id: string) {
  try {
    await finalitiesService.remove(id)
    revalidatePath('/dashboard/properties/finalities')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir a finalidade')
    }

    throw new Error('Erro desconhecido ao excluir a finalidade')
  }
}