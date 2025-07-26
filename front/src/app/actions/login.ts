'use server'

import { signIn } from '@/lib/auth';
import axios from 'axios';

export async function loginAction(email: string, password: string) {
  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao fazer login')
    }

    throw new Error('Credenciais inválidas.')
  }
}