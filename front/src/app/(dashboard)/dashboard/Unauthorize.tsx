'use client';

import { Spinner } from '@/components/Spinner';
import { removeAuthToken } from '@/services/httpClient';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useEffect } from "react";

export default function Unauthorize() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      removeAuthToken();
      await signOut({ callbackUrl: '/login' });
      router.push('/login');
    };
    handleSignOut();
  }, [router]);

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Spinner />
    </div>
  );
}