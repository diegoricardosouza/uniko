import { Page } from "@/entities/Page";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Page>(`/pages/${id}`);

  return data;
}