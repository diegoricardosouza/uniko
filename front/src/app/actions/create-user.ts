'use server'

import { usersService } from '@/services/usersService';
import { UserParams } from '@/services/usersService/create';
import axios from 'axios';

export async function createUser(user: UserParams) {
  try {
    await usersService.create(user)
    // revalidatePath('/dashboard/users')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar usuário')
    }

    throw new Error('Erro desconhecido ao criar usuário')
  }
}