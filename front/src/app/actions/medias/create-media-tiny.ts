'use server'

import { mediasService } from '@/services/mediasService';
import type { AxiosProgressEvent } from 'axios';
import axios from 'axios';

export async function createMediaTinyAction(formData: FormData, onProgress?: (progressEvent: AxiosProgressEvent) => void, id?: string) {
  const file = formData.get('file') as File

  if (!file || !(file instanceof Blob)) {
    throw new Error('Arquivo inválido')
  }

  // 🔥 Garante que a extensão esteja no nome do arquivo
  const filename = file.name || 'upload.jpg' // fallback para jpg

  const uploadForm = new FormData()
  uploadForm.append('file', file, filename)
  
  try {
    const data = await mediasService.create(file, {
      entityType: 'Post',
      mediaType: 'attachment',
      entityId: id,
    }, onProgress)
    return data;
    // revalidatePath('/dashboard/users')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao subir a imagem')
    }

    throw new Error('Erro desconhecido ao subir a imagem')
  }
}