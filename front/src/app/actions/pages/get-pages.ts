'use server'

import { pagesService } from '@/services/pagesService';
import axios from 'axios';

export async function getPostsAction() {
  try {
    return pagesService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter as páginas');
    }

    throw new Error('Erro ao obter as páginas');
  }
}