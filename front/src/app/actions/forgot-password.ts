'use server'

import { authService } from '@/services/authService';
import axios from 'axios';

export async function forgotPasswordAction(email: string) {
  try {
    await authService.forgotPassword({ email })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao enviar email')
    }

    throw new Error('Erro ao enviar email.')
  }
}