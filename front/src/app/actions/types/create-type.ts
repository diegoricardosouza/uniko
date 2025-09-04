'use server'

import { typesService } from '@/services/typesService';
import { TypeParams } from '@/services/typesService/create';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function createTypeAction(type: TypeParams) {
  try {
    await typesService.create(type)
    revalidatePath('/dashboard/properties/types')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar o tipo')
    }

    throw new Error('Erro desconhecido ao criar o tipo')
  }
}