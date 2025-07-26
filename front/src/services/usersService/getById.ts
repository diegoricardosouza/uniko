import { User } from "@/entities/User";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<User>(`/users/${id}`);

  return data;
}