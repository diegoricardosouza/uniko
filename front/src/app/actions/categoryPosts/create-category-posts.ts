'use server'

import { categoryPostsService } from '@/services/categoryPostsService';
import { CategorypostsParams } from '@/services/categoryPostsService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createCategoryPostsAction(cat: CategorypostsParams) {
  try {
    await categoryPostsService.create(cat)
    revalidatePath('/dashboard/blog/category')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar a categoria')
    }

    throw new Error('Erro desconhecido ao criar a categoria')
  }
}