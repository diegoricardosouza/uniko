'use server'

import { postsService } from '@/services/postsService';
import axios from 'axios';

export async function getPostsAction() {
  try {
    return postsService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os posts');
    }

    throw new Error('Erro ao obter os posts');
  }
}