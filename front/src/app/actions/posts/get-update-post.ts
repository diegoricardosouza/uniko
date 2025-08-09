'use server'

import { postsService } from '@/services/postsService';
import axios from 'axios';

export async function getUpdatepostAction(id: string, formData: FormData) {
  try {
    const result = await postsService.update(id, formData);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Status:", error.response?.status);
      console.error("Axios Error Data:", error.response?.data);
      console.error("Axios Error Headers:", error.response?.headers);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o post');
    }

    throw new Error('Erro ao atualizar o post');
  }
}