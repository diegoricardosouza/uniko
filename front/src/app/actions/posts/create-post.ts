'use server'

import { postsService } from '@/services/postsService';
import { PostsParams } from '@/services/postsService/create';
import axios from 'axios';

export async function createPostAction(user: PostsParams) {
  try {
    await postsService.create(user)
    // revalidatePath('/dashboard/users')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data)
      throw new Error(error.response?.data?.message || 'Erro ao criar o post')
    }

    throw new Error('Erro desconhecido ao criar o post')
  }
}