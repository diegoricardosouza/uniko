'use server'

import { emailService } from '@/services/emailService';
import axios from 'axios';

export async function getEmailsAction() {
  try {
    return emailService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os emails');
    }

    throw new Error('Erro ao obter os emails');
  }
}