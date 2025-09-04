'use server'

import { usersService } from '@/services/usersService';
import { UpdateUserParams } from '@/services/usersService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateUserAction(user: UpdateUserParams) {
  try {
    const response = await usersService.update(user);
    revalidatePath('/dashboard')

    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o usuário');
    }

    throw new Error('Erro ao atualizar o usuário');
  }
}