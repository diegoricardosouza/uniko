'use server'

import { usersService } from '@/services/usersService';
import { UpdateUserParams } from '@/services/usersService/update';
import axios from 'axios';

export async function getUpdateUserAction(user: UpdateUserParams) {
  try {
    return usersService.update(user);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o usuário');
    }

    throw new Error('Erro ao atualizar o usuário');
  }
}