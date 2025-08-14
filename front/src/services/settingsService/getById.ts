import { Setting } from "@/entities/Setting";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Setting>(`/settings/${id}`);

  return data;
}