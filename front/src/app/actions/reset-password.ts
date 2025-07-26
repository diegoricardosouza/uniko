'use server'

import { authService } from '@/services/authService';
import axios from 'axios';

export async function resetPasswordAction(token: string, password: string) {
  try {
    const newData = {
      token,
      newPassword: password
    }
    await authService.resetPassword(newData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao resetar a senha')
    }

    throw new Error('Erro ao resetar a senha.')
  }
}