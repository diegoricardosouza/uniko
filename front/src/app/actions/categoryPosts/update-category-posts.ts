'use server'

import { categoryPostsService } from '@/services/categoryPostsService';
import { UpdateCategoryPostsParams } from '@/services/categoryPostsService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateCategoryPostsAction(cat: UpdateCategoryPostsParams) {
  try {
    const category = await categoryPostsService.update(cat);
    revalidatePath('/dashboard/blog/category')

    return category;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar a categoria');
    }

    throw new Error('Erro ao atualizar a categoria');
  }
}