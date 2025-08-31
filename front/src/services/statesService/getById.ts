import { State } from "@/entities/State";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<State>(`/states/${id}`);

  return data;
}