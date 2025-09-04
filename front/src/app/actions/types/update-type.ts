'use server'

import { typesService } from '@/services/typesService';
import { UpdateTypeParams } from '@/services/typesService/update';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateTypeAction(type: UpdateTypeParams) {
  try {
    const response = await typesService.update(type);
    revalidatePath('/dashboard/properties/types')

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao atualizar o tipo');
    }

    throw new Error('Erro ao atualizar o tipo');
  }
}