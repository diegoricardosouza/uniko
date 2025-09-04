'use server'

import { finalitiesService } from '@/services/finalitiesService';
import { UpdateFinalityParams } from '@/services/finalitiesService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateFinalityAction(type: UpdateFinalityParams) {
  try {
    const response = await finalitiesService.update(type);
    revalidatePath('/dashboard/properties/finalities')

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar a finalidade');
    }

    throw new Error('Erro ao atualizar a finalidade');
  }
}