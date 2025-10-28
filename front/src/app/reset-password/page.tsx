import { Suspense } from "react";
import ResetPassword from "./ResetPassword";

export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="text-center">Carregando...</div>
      </div>
    }>
      <ResetPassword />
    </Suspense>
  );
}