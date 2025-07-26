'use server'

import { usersService } from '@/services/usersService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: string) {
  try {
    await usersService.remove(id)
    revalidatePath('/dashboard/users')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir usuário')
    }

    throw new Error('Erro desconhecido ao excluir usuário')
  }
}