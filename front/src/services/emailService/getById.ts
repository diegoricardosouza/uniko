import { Email } from "@/entities/Email";
import { httpClient } from "../httpClient";

export async function getById(id: string) {
  const { data } = await httpClient.get<Email>(`/emails/${id}`);

  return data;
}