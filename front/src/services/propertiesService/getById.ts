import { Property } from "@/entities/Property";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Property>(`/properties/${id}`);

  return data;
}