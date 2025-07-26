// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//     interface Session {
//         accessToken?: string;
//         user: {
//             id: string;
//             role: string;
//             active: boolean;
//         } & DefaultSession["user"];
//     }
// }

import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      role?: 'ADMIN' | 'EDITOR';
      active?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    role?: 'ADMIN' | 'EDITOR';
    active?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    role?: 'ADMIN' | 'EDITOR';
    active?: boolean;
  }
}