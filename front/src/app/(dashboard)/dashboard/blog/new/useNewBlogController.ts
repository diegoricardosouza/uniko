import { createPostAction } from "@/app/actions/posts/create-post";
import { blogCreateSchema } from "@/schemas/blogCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof blogCreateSchema>

export function useNewBlogController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(blogCreateSchema),
    defaultValues: {
      name: "",
      subtitle: "",
      featuredImage: undefined,
      content: "",
      categories: [],
    },
  })

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       const result = reader.result as string
  //       setImagePreview(result)
  //       form.setValue("featuredImage", file.name)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  function handleRemoveImage() {
    setImagePreview('');
    form.setValue("featuredImage", undefined);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      console.log(data);
      await createPostAction({
        ...data,
        categoryIds: data.categories
      });
      
      toast.success("Post cadastrado com sucesso!");
      router.push('/dashboard/blog');
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
    handleSubmit,
    handleRemoveImage,
    setImagePreview
  }
}