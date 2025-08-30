'use server'

import { emailService } from '@/services/emailService';
import axios from 'axios';

export async function getEmailAction(id: string) {
  try {
    return emailService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter o email');
    }

    throw new Error('Erro ao obter o email');
  }
}