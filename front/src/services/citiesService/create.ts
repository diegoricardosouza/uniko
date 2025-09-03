import { httpClient } from "../httpClient";

export interface CityParams {
  name: string;
  stateId: string;
}

export async function create(params: CityParams) {
  const { data } = await httpClient.post('/cities', params);

  return data;
}