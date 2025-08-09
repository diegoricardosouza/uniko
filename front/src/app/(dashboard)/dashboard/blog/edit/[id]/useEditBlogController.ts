 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostAction } from "@/app/actions/posts/get-post";
import { getUpdatepostAction } from "@/app/actions/posts/get-update-post";
import { blogUpdateSchema } from "@/schemas/blogUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof blogUpdateSchema>

export function useEditBlogController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null)
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const form = useForm<FormData>({
    resolver: zodResolver(blogUpdateSchema),
    defaultValues: {
      name: "",
      subtitle: "",
      featuredImage: undefined,
      content: "",
      categories: [],
    },
  })

  useEffect(() => {
      if (!id) return;
  
      const fetchPost = async () => {
        try {
          setIsDataLoaded(false);
          
          const post = await getPostAction(id);
          const featuredImagePost = post.medias?.filter((media) => media.mediaType === "featured_image")[0];
          const categoriesFromPost = post.categories
            ? post.categories.map((cat: any) => String(cat.id))
            : [];
      
          form.setValue("name", post.name ?? "");
          form.setValue("subtitle", post.subtitle ?? "");
          form.setValue("featuredImage", featuredImagePost?.url);
          form.setValue("content", post.content ?? "");
          form.setValue("categories", categoriesFromPost);
          setImagePreview(`${featuredImagePost?.url ? process.env.NEXT_PUBLIC_API_URL : ''}${featuredImagePost?.url ?? ""}`);
          setIsDataLoaded(true);
        } catch (error: any) {
          console.log(error);
          toast.error("Erro ao buscar dados do usuário");
        }
      };
  
      fetchPost();
    }, [id, form]);

  // Função para lidar com seleção de nova imagem
  function handleImageChange(file: File) {
    setSelectedFile(file);

    // Criar preview da nova imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    form.setValue("featuredImage", file);
  }
    
  function handleRemoveImage() {
    setImagePreview('');
    setSelectedFile(null);
    form.setValue("featuredImage", undefined);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      if (data.subtitle) formData.append('subtitle', data.subtitle);
      if (data.content) formData.append('content', data.content);
      if (data.categories?.length) {
        formData.append('categoryIds', JSON.stringify(data.categories));
      }
      if (selectedFile) {
        formData.append('featuredImage', selectedFile);
      }

      await getUpdatepostAction(id, formData);

      toast.success("Post atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar post");
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    isLoading,
    imagePreview,
    handleSubmit,
    handleRemoveImage,
    setImagePreview,
    handleImageChange,
    isDataLoaded
  }
}