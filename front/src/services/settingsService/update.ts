import { Setting } from "@/entities/Setting";
import { httpClient } from "../httpClient";

export async function update({ id, ...params }: Setting) {
  const { data } = await httpClient.patch(`/settings/${id}`, params);

  return data;
}