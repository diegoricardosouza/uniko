'use client';

import { useRole } from '@/hooks/useRole';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRoles,
  fallback,
  redirectTo
}: ProtectedRouteProps) {
  const { user, isLoading, canAccess } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (!isLoading && user && !canAccess(requiredRoles)) {
      // Se não especificou um redirect customizado, usa lógica padrão
      if (!redirectTo) {
        // Se a role requerida é admin e usuário não é admin, vai para dashboard
        if (requiredRoles?.includes('ADMIN') && user.role !== 'ADMIN') {
          router.push('/dashboard');
          return;
        }
        // Para outras roles, vai para dashboard também
        router.push('/dashboard');
      } else {
        router.push(redirectTo);
      }
      return;
    }
  }, [user, isLoading, canAccess, requiredRoles, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className='animate-spin'/>
      </div>
    );
  }

  if (!user) {
    return fallback || null;
  }

  if (!canAccess(requiredRoles)) {
    return fallback || null;
  }

  return <>{children}</>;
}