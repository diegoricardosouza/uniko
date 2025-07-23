import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  password: z.string()
    .min(6, 'Senha precisa ter pelo menos 6 caracteres')
})

type FormData = z.infer<typeof schema>

export function useResetPasswordController() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const token = searchParams.get('token');

  if(!token) {
    redirect("/login");
  }

  const {
    register,
    reset,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      setLoading(true);
      const newData = {
        token,
        newPassword: data.password
      }
      await authService.resetPassword(newData);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setErrorApi(true);
      setTimeout(() => setErrorApi(false), 2000);
    } finally {
      setLoading(false);
    }
  })

  return {
    errors,
    register,
    handleSubmit,
    loading,
    success,
    errorApi
  }
}