'use client';

import { localStoragekeys } from '@/config/localStorageKeys';
import { signOut } from '@/lib/auth';
import { removeAuthToken } from '@/services/httpClient';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(localStoragekeys.TOKEN);
    setToken(storedToken);
  }, []);

  const logout = async () => {
    removeAuthToken();

    if (session) {
      await signOut();
    }

    window.location.href = '/login';
  };

  return {
    user: session?.user,
    accessToken: session?.accessToken || token,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated' || !!token,
    logout,
  };
}