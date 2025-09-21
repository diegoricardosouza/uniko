import { Page } from "@/entities/Page";
import { httpClient } from "../httpClient";

export async function getBySlug(slug: string) {
  const { data } = await httpClient.get<Page>(`/pages/slug/${slug}`);

  return data;
}