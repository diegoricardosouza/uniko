'use server'

import { postsService } from '@/services/postsService';
import axios from 'axios';

export async function getPostsRelatedAction(id: string, limit: number) {
  try {
    return postsService.getRelated(id, limit);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o post');
    }

    throw new Error('Erro ao obter o post');
  }
}