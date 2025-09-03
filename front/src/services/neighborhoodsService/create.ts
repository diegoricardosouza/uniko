import { httpClient } from "../httpClient";

export interface NeighborhoodParams {
  name: string;
  cityId: string;
}

export async function create(params: NeighborhoodParams) {
  const { data } = await httpClient.post('/neighborhoods', params);

  return data;
}