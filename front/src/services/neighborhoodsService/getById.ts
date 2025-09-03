import { Neighborhood } from "@/entities/Neighborhood";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Neighborhood>(`/neighborhoods/${id}`);

  return data;
}