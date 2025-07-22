import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido')
})

type FormData = z.infer<typeof schema>

export function useForgotPasswordController() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorApi, setErrorApi] = useState(false);

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
      await authService.forgotPassword(data);
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