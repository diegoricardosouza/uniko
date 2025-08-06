import { httpClient } from "../httpClient";

export interface UpdateMediasParams {
  id: string;
  entityType: string;
  entityId: string;
  mediaType: string;
  alt?: string;
  title?: string;
  description?: string;
  order?: string;
  isActive?: string;
}

export async function update({ id, ...params }: UpdateMediasParams) {
  const { data } = await httpClient.patch(`/medias/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}