import { Medias } from "@/entities/Medias";
import { httpClient } from "../httpClient";

export async function getByName(name: string) {
  const { data } = await httpClient.get<Medias>(`/medias/name/${name}`);

  return data;
}