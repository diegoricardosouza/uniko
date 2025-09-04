import { httpClient } from "../httpClient";

export interface TypeParams {
  name: string;
}

export async function create(params: TypeParams) {
  const { data } = await httpClient.post('/types', params);

  return data;
}