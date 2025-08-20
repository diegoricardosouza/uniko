import { createPageAction } from "@/app/actions/pages/create-page";
import { pageCreateSchema } from "@/schemas/pageCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof pageCreateSchema>

export function useNewPageController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(pageCreateSchema),
    defaultValues: {
      name: "",
      content: "",
      featuredImage: undefined
    },
  })

  function handleRemoveImage() {
    setImagePreview('');
    form.setValue("featuredImage", undefined);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      console.log(data);
      await createPageAction({
        ...data
      });
      
      toast.success("Página cadastrada com sucesso!");
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar a página");
    } finally {
      setIsLoading(false)
    }
  })

  return {
    form,
    isLoading,
    imagePreview,
    handleSubmit,
    handleRemoveImage,
    setImagePreview
  }
}