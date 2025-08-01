import { createUser } from "@/app/actions/create-user"
import { userCreateSchema } from "@/schemas/userCreateSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

type FormData = z.infer<typeof userCreateSchema>

export function useNewUserController() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      active: true,
      role: "ADMIN",
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      
      await createUser({ ...data, active: data.active ?? true });

      toast.success("Usuário cadastrado com sucesso!")
      router.push('/dashboard/users');
      // Resetar o formulário após sucesso
      form.reset()
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar usuário");
    } finally {
      setIsLoading(false)
    }
  })

  return {
    form,
    isLoading,
    handleSubmit
  }
}