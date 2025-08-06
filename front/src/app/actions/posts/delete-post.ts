'use server'

import { postsService } from '@/services/postsService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deletePostAction(id: string) {
  try {
    await postsService.remove(id)
    revalidatePath('/dashboard/blog')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o post')
    }

    throw new Error('Erro desconhecido ao excluir o post')
  }
}