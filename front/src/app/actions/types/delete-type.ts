'use server'

import { typesService } from '@/services/typesService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteTypeAction(id: string) {
  try {
    await typesService.remove(id)
    revalidatePath('/dashboard/properties/types')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o tipo')
    }

    throw new Error('Erro desconhecido ao excluir o tipo')
  }
}