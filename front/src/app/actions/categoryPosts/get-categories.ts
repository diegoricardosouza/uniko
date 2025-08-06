'use server'

import { categoryPostsService } from '@/services/categoryPostsService';
import axios from 'axios';

export async function getCategoriesAction() {
  try {
    return categoryPostsService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter as categorias');
    }

    throw new Error('Erro ao obter as categorias');
  }
}