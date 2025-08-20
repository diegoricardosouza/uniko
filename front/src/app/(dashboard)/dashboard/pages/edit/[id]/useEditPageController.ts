/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPageAction } from "@/app/actions/pages/get-page";
import { updatePageAction } from "@/app/actions/pages/update-page";
import { pageUpdateSchema } from "@/schemas/pageUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof pageUpdateSchema>

export function useEditPageController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null)
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const form = useForm<FormData>({
    resolver: zodResolver(pageUpdateSchema),
    defaultValues: {
      name: "",
      featuredImage: undefined,
      content: ""
    },
  })

  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        setIsDataLoaded(false);
        
        const post = await getPageAction(id);
        const featuredImagePost = post.medias?.filter((media) => media.mediaType === "featured_image")[0];
    
        form.setValue("name", post.name ?? "");
        form.setValue("featuredImage", featuredImagePost?.url);
        form.setValue("content", post.content ?? "");
        setImagePreview(`${featuredImagePost?.url ? process.env.NEXT_PUBLIC_API_URL : ''}${featuredImagePost?.url ?? ""}`);
        setIsDataLoaded(true);
      } catch (error: any) {
        console.log(error);
        toast.error("Erro ao buscar dados da página");
      }
    };

    fetchPage();
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
      if (data.content) formData.append('content', data.content);
      if (selectedFile) {
        formData.append('featuredImage', selectedFile);
      }

      await updatePageAction(id, formData);

      toast.success("Página atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar a página");
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