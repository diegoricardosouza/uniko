'use server'

import { pagesService } from '@/services/pagesService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deletePageAction(id: string) {
  try {
    await pagesService.remove(id)
    revalidatePath('/dashboard/pages')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir a página')
    }

    throw new Error('Erro desconhecido ao excluir a página')
  }
}