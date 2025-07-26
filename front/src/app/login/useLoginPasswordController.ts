import { localStoragekeys } from "@/config/localStorageKeys";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginAction } from "../actions/login";

type FormData = z.infer<typeof loginSchema>

export function useLoginPasswordController() {
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);
      await loginAction(data.email, data.password)

      const newSession = await getSession();

      if (newSession?.accessToken) {
        localStorage.setItem(localStoragekeys.TOKEN, newSession.accessToken);
      }
      router.push('/dashboard');
    } catch (error) {
      setLoading(true);
      console.log(error);
      
      setErrorApi(true);
      setTimeout(() => setErrorApi(false), 2000);
    } finally {
      setLoading(false);
    }
  })

  return {
    form,
    loading,
    errorApi,
    handleSubmit
  }
}