export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  role: 'ADMIN' | 'EDITOR';
}