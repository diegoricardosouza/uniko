'use server'

import { emailService } from '@/services/emailService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteEmailAction(id: string) {
  try {
    await emailService.remove(id)
    revalidatePath('/dashboard/emails')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o email')
    }

    throw new Error('Erro desconhecido ao excluir o email')
  }
}