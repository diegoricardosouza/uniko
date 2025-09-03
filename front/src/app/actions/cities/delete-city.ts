'use server'

import { citiesService } from '@/services/citiesService';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function deleteCityAction(id: string) {
  try {
    await citiesService.remove(id)
    revalidatePath('/dashboard/properties/cities')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao excluir a cidade')
    }

    throw new Error('Erro desconhecido ao excluir a cidade')
  }
}