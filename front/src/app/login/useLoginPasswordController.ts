import { localStoragekeys } from "@/config/localStorageKeys";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError, CredentialsSignin } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.string()
    .email('Informe um e-mail válido'),
  password: z.string()
    .min(1, 'Senha é obrigatória')
})

type FormData = z.infer<typeof schema>

export function useLoginPasswordController() {
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      setLoading(true);
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
      
      if (result?.error) {
        setErrorApi(true);
        setTimeout(() => setErrorApi(false), 3000);
      } else {
        const newSession = await getSession();
        
        if (newSession?.accessToken) {
          localStorage.setItem(localStoragekeys.TOKEN, newSession.accessToken);
        }

        router.push('/dashboard');
      }
    } catch (error) {
      setLoading(true);
      if (error instanceof CredentialsSignin) {
        return { error: 'Credenciais inválidas' };
      }

      if (error instanceof AuthError) {
        return { error: 'Something went wrong. Try again' };
      }
      setErrorApi(true);
      setTimeout(() => setErrorApi(false), 2000);
    } finally {
      setLoading(false);
    }
  })

  return {
    errors,
    loading,
    errorApi,
    register,
    handleSubmit
  }
}