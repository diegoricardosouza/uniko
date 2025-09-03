import { httpClient } from "../httpClient";


export async function remove(userId: string) {
  const { data } = await httpClient.delete(`/cities/${userId}`);

  return data;
}