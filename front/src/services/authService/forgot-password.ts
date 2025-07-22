import { httpClient } from "../httpClient";

interface ForgotPasswordParams {
  email: string;
}

export async function forgotPassword(params: ForgotPasswordParams) {
  const { data } = await httpClient.post("/auth/forgot-password", params);

  return data;
}