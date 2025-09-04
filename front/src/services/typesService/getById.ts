import { Type } from "@/entities/Type";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Type>(`/types/${id}`);

  return data;
}