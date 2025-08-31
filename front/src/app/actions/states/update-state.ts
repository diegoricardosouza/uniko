'use server'

import { statesService } from '@/services/statesService';
import { UpdateStateParams } from '@/services/statesService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateStateAction(state: UpdateStateParams) {
  try {
    const response = await statesService.update(state);
    revalidatePath('/dashboard/properties/states')

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o estado');
    }

    throw new Error('Erro ao atualizar o estado');
  }
}