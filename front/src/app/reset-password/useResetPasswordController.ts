import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { resetPasswordAction } from "../actions/reset-password";


type FormData = z.infer<typeof resetPasswordSchema>

export function useResetPasswordController() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const token = searchParams.get('token');

  if(!token) {
    redirect("/login");
  }

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: ""
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await resetPasswordAction(token, data.password);
      setSuccess(true);
      form.reset();
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
    form,
    handleSubmit,
    loading,
    success,
    errorApi
  }
}