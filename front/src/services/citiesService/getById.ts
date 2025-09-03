import { City } from "@/entities/City";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<City>(`/cities/${id}`);

  return data;
}