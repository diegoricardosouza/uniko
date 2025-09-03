'use server'

import { neighborhoodsService } from '@/services/neighborhoodsService';
import { UpdateNeighborhoodParams } from '@/services/neighborhoodsService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateNeighborhoodAction(neighborhood: UpdateNeighborhoodParams) {
  try {
    const response = await neighborhoodsService.update(neighborhood);
    revalidatePath('/dashboard/properties/neighborhoods')

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o bairro');
    }

    throw new Error('Erro ao atualizar o bairro');
  }
}