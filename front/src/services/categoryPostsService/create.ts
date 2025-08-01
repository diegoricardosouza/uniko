import { httpClient } from "../httpClient";

export interface CategorypostsParams {
  name: string;
  description?: string;
}

export async function create(params: CategorypostsParams) {
  const { data } = await httpClient.post('/category-posts', params);

  return data;
}