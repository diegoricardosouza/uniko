
import { Medias } from "@/entities/Medias";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Medias[]>('/medias');

  return data;
}