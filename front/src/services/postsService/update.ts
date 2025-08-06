import { httpClient } from "../httpClient";

export interface PostsParams {
  id: string;
  name: string;
  subtitle?: string;
  featuredImage: string | File;
  content?: string;
  categoryIds?: string[];
}

export async function update({ id, ...params }: PostsParams) {
  const { data } = await httpClient.patch(`/posts/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}