'use client';

import { localStoragekeys } from '@/config/localStorageKeys';
import { removeAuthToken } from '@/services/httpClient';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem(localStoragekeys.TOKEN);
    setToken(storedToken);
  }, []);

  const logout = async () => {
    removeAuthToken();

    if (session) {
      await signOut();
    }

    router.push('/login');
  };

  return {
    user: session?.user,
    accessToken: session?.accessToken || token,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated' || !!token,
    logout,
  };
}