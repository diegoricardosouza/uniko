
import { Property } from "@/entities/Property";
import { httpClient } from "../httpClient";

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

export interface GetPropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  finalities?: string[];
  orderDirection?: string;
  city?: string;
  neighborhood?: string;
  types?: string[];
}

export async function getAllPaginate(params: GetPropertiesParams = {}) {
  const { data } = await httpClient.get<PaginatedResponse<Property>>('/properties/paginate', {
    params
  });

  return data;
}