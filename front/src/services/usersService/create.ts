import { httpClient } from "../httpClient";

export interface UserParams {
  name: string;
  email: string;
  active: boolean;
  role: 'ADMIN' | 'EDITOR';
}

export async function create(params: UserParams) {
  const { data } = await httpClient.post('/users', params);

  return data;
}