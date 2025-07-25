// Definições de tipos personalizadas para auth
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
  active?: boolean;
  accessToken?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken?: string;
  expires: string;
}

export interface AuthToken {
  accessToken?: string;
  role?: string;
  active?: boolean;
  sub?: string;
  email?: string;
  name?: string;
}