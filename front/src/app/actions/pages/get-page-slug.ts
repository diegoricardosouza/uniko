'use server'

import { pagesService } from '@/services/pagesService';
import axios from 'axios';

export async function getPageSlugAction(slug: string) {
  try {
    return pagesService.getBySlug(slug);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter a página');
    }

    throw new Error('Erro ao obter a página');
  }
}