'use server'

import { finalitiesService } from '@/services/finalitiesService';
import { FinalityParams } from '@/services/finalitiesService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createFinalityAction(type: FinalityParams) {
  try {
    await finalitiesService.create(type)
    revalidatePath('/dashboard/properties/finalities')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar a finalidade')
    }

    throw new Error('Erro desconhecido ao criar a finalidade')
  }
}