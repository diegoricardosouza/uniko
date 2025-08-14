'use server'

import { Setting } from '@/entities/Setting';
import { settingsService } from '@/services/settingsService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function getUpdateSettingAction(params: Setting) {
  try {
    const result = await settingsService.update(params);
    revalidatePath('/dashboard/settings')
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Status:", error.response?.status);
      console.error("Axios Error Data:", error.response?.data);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o item');
    }

    throw new Error('Erro ao atualizar o item');
  }
}