
import { Property } from "@/entities/Property";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Property[]>('/properties');

  return data;
}