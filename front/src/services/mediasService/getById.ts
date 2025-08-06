import { Medias } from "@/entities/Medias";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Medias>(`/medias/${id}`);

  return data;
}