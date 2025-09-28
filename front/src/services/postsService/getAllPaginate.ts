import { Post } from "@/entities/Post";
import { httpClient } from "../httpClient";

// Interface para resposta paginada
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Interface para parâmetros da busca
export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryIds?: string[];
}

export async function getAllPaginate(params: GetPostsParams = {}) {
  const { data } = await httpClient.get<PaginatedResponse<Post>>('/posts/paginate', {
    params
  });
  return data;
}