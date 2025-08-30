
import { Email } from "@/entities/Email";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Email[]>('/emails');

  return data;
}