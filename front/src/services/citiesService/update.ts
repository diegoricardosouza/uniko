import { httpClient } from "../httpClient";

export interface UpdateCityParams {
  id: string;
  name?: string;
  stateId?: string;
}

export async function update({ id, ...params }: UpdateCityParams) {
  const { data } = await httpClient.patch(`/cities/${id}`, params);

  return data;
}