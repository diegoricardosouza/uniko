'use server'

import { citiesService } from '@/services/citiesService';
import { UpdateCityParams } from '@/services/citiesService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateCityAction(city: UpdateCityParams) {
  try {
    const response = await citiesService.update(city);
    revalidatePath('/dashboard/properties/cities')

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o estado');
    }

    throw new Error('Erro ao atualizar o estado');
  }
}