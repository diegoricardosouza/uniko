'use server'

import { pagesService } from '@/services/pagesService';
import { PagesParams } from '@/services/pagesService/create';
import axios from 'axios';

export async function createPageAction(user: PagesParams) {
  try {
    await pagesService.create(user)
    // revalidatePath('/dashboard/users')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar a página')
    }

    throw new Error('Erro desconhecido ao criar a página')
  }
}