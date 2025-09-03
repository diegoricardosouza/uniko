import { httpClient } from "../httpClient";

export interface UpdateNeighborhoodParams {
  id: string;
  name?: string;
  cityId?: string;
}

export async function update({ id, ...params }: UpdateNeighborhoodParams) {
  const { data } = await httpClient.patch(`/neighborhoods/${id}`, params);

  return data;
}