import { httpClient } from "../httpClient";

export interface UpdateCategoryPostsParams {
  id: string;
  name: string;
  description?: string;
}

export async function update({ id, ...params }: UpdateCategoryPostsParams) {
  const { data } = await httpClient.patch(`/category-posts/${id}`, params);

  return data;
}