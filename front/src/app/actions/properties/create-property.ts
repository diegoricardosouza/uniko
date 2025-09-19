'use server'

import { propertiesService } from '@/services/propertiesService';
import { PropertiesParams } from '@/services/propertiesService/create';
import axios from 'axios';

export async function createPropertyAction(user: PropertiesParams) {
  try {
    await propertiesService.create(user)
  } catch (error) {
    console.log('errorrrr:', error);
    
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar o imóvel')
    }

    throw new Error('Erro desconhecido ao criar o imóvel')
  }
}