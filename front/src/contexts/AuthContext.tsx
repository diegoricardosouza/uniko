'use client';

import { User } from "@/entities/User";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";


export interface AuthSession {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  hasRole: (roles: string | string[]) => boolean;
  canAccess: (requiredRoles?: string[]) => boolean;
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session]);

  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const canAccess = (
    requiredRoles?: string[]
  ): boolean => {
    if (!user) return false;

    // Se não há requisitos, usuário logado pode acessar
    if (!requiredRoles) return true;

    // Verifica roles se especificadas
    if (requiredRoles && !hasRole(requiredRoles)) return false;

    return true;
  };

  return (
    <AuthContext.Provider 
    value={{
      user,
      isLoading,
      hasRole,
      canAccess
    }}>
      {children}
    </AuthContext.Provider>
  )
}