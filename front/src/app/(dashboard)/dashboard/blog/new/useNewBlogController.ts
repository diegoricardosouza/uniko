import { blogCreateSchema } from "@/schemas/blogCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const categorias = [
  { id: "tecnologia", label: "Tecnologia" },
  { id: "design", label: "Design" },
  { id: "programacao", label: "Programação" },
  { id: "marketing", label: "Marketing" },
  { id: "negocios", label: "Negócios" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "educacao", label: "Educação" },
  { id: "saude", label: "Saúde" },
  { id: "viagem", label: "Viagem" },
  { id: "culinaria", label: "Culinária" },
  { id: "esportes", label: "Esportes" },
  { id: "musica", label: "Música" },
  { id: "arte", label: "Arte" },
  { id: "ciencia", label: "Ciência" },
  { id: "historia", label: "História" },
  { id: "politica", label: "Política" },
  { id: "financas", label: "Finanças" },
  { id: "moda", label: "Moda" },
  { id: "automotivo", label: "Automotivo" },
  { id: "games", label: "Games" },
]

type FormData = z.infer<typeof blogCreateSchema>

export function useNewBlogController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      name: "",
      subtitle: "",
      featuredImage: "",
      content: "",
      categories: [],
    },
  })

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        form.setValue("featuredImage", file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      console.log(data);
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
    imagePreview,
    categorias,
    handleImageChange,
    handleSubmit
  }
}