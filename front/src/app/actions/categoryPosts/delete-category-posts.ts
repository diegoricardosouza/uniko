'use server'

import { categoryPostsService } from '@/services/categoryPostsService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteCategoryPostsAction(id: string) {
  try {
    await categoryPostsService.remove(id)
    revalidatePath('/dashboard/blog/category')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir usuário')
    }

    throw new Error('Erro desconhecido ao excluir usuário')
  }
}