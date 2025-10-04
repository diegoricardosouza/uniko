import { Property } from "@/entities/Property";
import { httpClient } from "../httpClient";

export async function getBySlug(slug: string) {
  const { data } = await httpClient.get<Property>(`/properties/slug/${slug}`);

  return data;
}