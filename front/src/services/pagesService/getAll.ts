
import { Page } from "@/entities/Page";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Page[]>('/pages');

  return data;
}