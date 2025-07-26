import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { forgotPasswordAction } from "../actions/forgot-password";

type FormData = z.infer<typeof forgotPasswordSchema>

export function useForgotPasswordController() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorApi, setErrorApi] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await forgotPasswordAction(data.email)
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