import { httpClient } from "../httpClient";

export interface UpdatePagesParams {
  id: string;
  name: string;
  content?: string;
  featuredImage: string | File | undefined;
}

export async function update(id: string, formData: FormData) {
  const { data } = await httpClient.patch(`/pages/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}