import { httpClient } from "../httpClient";

export interface UpdateFinalityParams {
  id: string;
  name?: string;
}

export async function update({ id, ...params }: UpdateFinalityParams) {
  const { data } = await httpClient.patch(`/finalities/${id}`, params);

  return data;
}