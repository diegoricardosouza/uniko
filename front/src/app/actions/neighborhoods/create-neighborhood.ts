'use server'

import { neighborhoodsService } from '@/services/neighborhoodsService';
import { NeighborhoodParams } from '@/services/neighborhoodsService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createNeighborhoodAction(neighborhood: NeighborhoodParams) {
  try {
    await neighborhoodsService.create(neighborhood)
    revalidatePath('/dashboard/properties/neighborhoods')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar o bairro')
    }

    throw new Error('Erro desconhecido ao criar o bairro')
  }
}