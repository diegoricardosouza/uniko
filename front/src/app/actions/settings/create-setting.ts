'use server'

import { settingsService } from '@/services/settingsService';
import { SettingsParams } from '@/services/settingsService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createSettingAction(setting: SettingsParams) {
  try {
    await settingsService.create(setting)
    revalidatePath('/dashboard/settings')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar o item')
    }

    throw new Error('Erro desconhecido ao criar o item')
  }
}