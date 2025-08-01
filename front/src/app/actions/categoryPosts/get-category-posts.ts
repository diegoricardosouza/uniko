'use server'

import { categoryPostsService } from '@/services/categoryPostsService';
import axios from 'axios';

export async function getCategoryPostsAction(id: string) {
  try {
    return categoryPostsService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter a categoria');
    }

    throw new Error('Erro ao obter a categoria');
  }
}