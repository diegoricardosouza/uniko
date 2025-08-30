'use server'

import { emailService } from '@/services/emailService';
import { EmailsParams } from '@/services/emailService/send';
import axios from 'axios';

export async function sendMailAction(email: EmailsParams) {
  try {
    await emailService.send(email)
    // revalidatePath('/dashboard/users')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao enviar email')
    }

    throw new Error('Erro desconhecido ao enviar email')
  }
}