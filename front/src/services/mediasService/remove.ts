import { httpClient } from "../httpClient";

export async function remove(userId: string) {
  const { data } = await httpClient.delete(`/medias/${userId}`);

  return data;
}