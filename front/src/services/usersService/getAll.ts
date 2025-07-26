
import { User } from "@/entities/User";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<User[]>('/users');

  return data;
}