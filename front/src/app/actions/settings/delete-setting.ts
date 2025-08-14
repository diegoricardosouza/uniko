'use server'

import { settingsService } from '@/services/settingsService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteSettingAction(id: string) {
  try {
    await settingsService.remove(id)
    revalidatePath('/dashboard/settings')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir o item')
    }

    throw new Error('Erro desconhecido ao excluir o item')
  }
}