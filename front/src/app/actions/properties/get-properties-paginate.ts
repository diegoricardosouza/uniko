'use server'

import { propertiesService } from '@/services/propertiesService';
import { GetPropertiesParams } from '@/services/propertiesService/getAllPaginate';
import axios from 'axios';

export async function getPropertiesPaginateAction(params: GetPropertiesParams = {}) {
  try {
    return propertiesService.getAllPaginate(params);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao obter os imóveis');
    }

    throw new Error('Erro ao obter os imóveis');
  }
}