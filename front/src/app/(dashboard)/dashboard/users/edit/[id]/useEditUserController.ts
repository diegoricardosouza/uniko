/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUpdateUserAction } from "@/app/actions/get-update-user";
import { getUserAction } from "@/app/actions/get-user";
import { userUpdateSchema } from "@/schemas/userUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof userUpdateSchema>

export function useEditUserController() {
  const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  
  const form = useForm<FormData>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      active: true,
      role: "EDITOR",
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const user = await getUserAction(id);
        form.reset(user); // Preenche os campos do form
      } catch (error: any) {
        toast.error("Erro ao buscar dados do usuário", error);
      }
    };

    fetchUser();
  }, [id, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      console.log(data);
      const newData = {
        name: data.name,
        email: data.email,
        password: data.password === "" ? null : data.password,
        role: data.role,
        active: data.active ?? true
      }
      await getUpdateUserAction({ ...newData, id })
      toast.success("Usuário atualizado com sucesso!")
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar usuário");
    } finally {
      setIsLoading(false)
    }
  })

  return {
    form,
    handleSubmit,
    isLoading
  }
}