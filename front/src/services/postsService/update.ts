import { httpClient } from "../httpClient";

export interface UpdatePostsParams {
  id: string;
  name: string;
  subtitle?: string;
  featuredImage?: string | File;
  content?: string;
  categoryIds?: string[];
}

export async function update(id: string, formData: FormData) {
  const { data } = await httpClient.patch(`/posts/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}