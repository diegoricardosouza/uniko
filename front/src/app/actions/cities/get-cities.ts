'use server'

import { citiesService } from '@/services/citiesService';
import axios from 'axios';

export async function getCitiesAction() {
  try {
    return citiesService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter as cidades');
    }

    throw new Error('Erro ao obter as cidades');
  }
}