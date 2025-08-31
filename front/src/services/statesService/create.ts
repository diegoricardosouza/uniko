import { httpClient } from "../httpClient";

export interface StateParams {
  name: string;
  acronym: string;
}

export async function create(params: StateParams) {
  const { data } = await httpClient.post('/states', params);

  return data;
}