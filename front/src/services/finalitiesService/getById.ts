import { Finality } from "@/entities/Finality";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Finality>(`/finalities/${id}`);

  return data;
}