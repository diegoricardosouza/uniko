import { httpClient } from "../httpClient";

export async function remove(userId: string) {
  const { data } = await httpClient.delete(`/properties/${userId}`);

  return data;
}