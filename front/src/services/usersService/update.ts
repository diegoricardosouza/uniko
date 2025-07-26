import { httpClient } from "../httpClient";

export interface UpdateUserParams {
  id: string;
  name: string;
  email: string;
  active: boolean;
  password?: string | null;
  role: 'ADMIN' | 'EDITOR';
}

export async function update({ id, ...params }: UpdateUserParams) {
  const { data } = await httpClient.patch(`/users/${id}`, params);

  return data;
}