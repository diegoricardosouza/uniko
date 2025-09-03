'use server'

import { citiesService } from '@/services/citiesService';
import { CityParams } from '@/services/citiesService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createCityAction(city: CityParams) {
  try {
    await citiesService.create(city)
    revalidatePath('/dashboard/properties/cities')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar a cidade')
    }

    throw new Error('Erro desconhecido ao criar a cidade')
  }
}