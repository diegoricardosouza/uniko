'use client';

import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';

import { useEffect } from "react";

export default function Unauthorize() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Spinner />
    </div>
  );
}