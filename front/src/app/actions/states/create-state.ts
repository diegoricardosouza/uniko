'use server'

import { statesService } from '@/services/statesService';
import { StateParams } from '@/services/statesService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createStateAction(state: StateParams) {
  try {
    await statesService.create(state)
    revalidatePath('/dashboard/properties/states')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar o estado')
    }

    throw new Error('Erro desconhecido ao criar o estado')
  }
}