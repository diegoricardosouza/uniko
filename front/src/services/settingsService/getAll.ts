import { Setting } from "@/entities/Setting";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Setting[]>('/settings');

  return data;
}