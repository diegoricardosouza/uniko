'use server'

import { finalitiesService } from '@/services/finalitiesService';
import axios from 'axios';

export async function getFinalitiesAction() {
  try {
    return finalitiesService.getAll();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter as finalidades');
    }

    throw new Error('Erro ao obter as finalidades');
  }
}