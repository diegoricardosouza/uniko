'use server'

import { postsService } from '@/services/postsService';
import axios from 'axios';

// Interface para os parâmetros (deve corresponder à do service)
export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryIds?: string[];
}

export async function getPostsPaginateAction(params: GetPostsParams = {}) {
  try {
    return await postsService.getAllPaginate(params);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data);
      throw new Error(error.response?.data?.message || 'Erro ao obter os posts');
    }

    console.error("Erro inesperado:", error);
    throw new Error('Erro ao obter os posts');
  }
}