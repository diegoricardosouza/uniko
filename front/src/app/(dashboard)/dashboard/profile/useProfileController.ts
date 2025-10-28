/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateUserAction } from "@/app/actions/users/get-update-user";
import { getUserAction } from "@/app/actions/users/get-user";
import { userUpdateSchema } from "@/schemas/userUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof userUpdateSchema>

export function useProfileController() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  // const params = useParams();
  // const id = typeof params?.id === "string" ? params.id : "";
  const id = session?.user.id;

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
        form.reset(user);
      } catch (error: any) {
        console.log(error);
        toast.error("Erro ao buscar dados do usuário");
      }
    };

    fetchUser();
  }, [id, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      const newData = {
        name: data.name,
        email: data.email,
        password: data.password === "" ? null : data.password,
        role: data.role,
        active: data.active ?? true
      }
      if (!id) {
        toast.error("ID do usuário não encontrado.");
        return;
      }
      await updateUserAction({ ...newData, id })

      toast.success("Perfil atualizado com sucesso!")
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao atualizar o perfil");
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