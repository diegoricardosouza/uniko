import { httpClient } from "../httpClient";

export interface UpdateStateParams {
  id: string;
  name?: string;
  acronym?: string;
}

export async function update({ id, ...params }: UpdateStateParams) {
  const { data } = await httpClient.patch(`/states/${id}`, params);

  return data;
}