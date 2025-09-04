import { httpClient } from "../httpClient";

export interface FinalityParams {
  name: string;
}

export async function create(params: FinalityParams) {
  const { data } = await httpClient.post('/finalities', params);

  return data;
}