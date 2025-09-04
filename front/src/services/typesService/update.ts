import { httpClient } from "../httpClient";

export interface UpdateTypeParams {
  id: string;
  name?: string;
}

export async function update({ id, ...params }: UpdateTypeParams) {
  const { data } = await httpClient.patch(`/types/${id}`, params);

  return data;
}