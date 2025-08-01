import { createCategoryPostsAction } from "@/app/actions/categoryPosts/create-category-posts";
import { getCategoryPostsAction } from "@/app/actions/categoryPosts/get-category-posts";
import { updateCategoryPostsAction } from "@/app/actions/categoryPosts/update-category-posts";
import { categoryPostsSchema } from "@/schemas/categoryPostsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof categoryPostsSchema>

export function useCategoryPostsController() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [idCategory, setIdCategory] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(categoryPostsSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleNew = () => {
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      description: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = async (idCategory: string) => {
    const categories = await getCategoryPostsAction(idCategory);
    setIdCategory(idCategory);
    setEditingCategory(true);
    form.reset(categories);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      description: '',
    });
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      console.log(data);

      if (editingCategory) {
        await updateCategoryPostsAction({
          ...data,
          id: idCategory
        });
      }

      if (!editingCategory) {
        await createCategoryPostsAction(data);
      }

      toast.success("Categoria cadastrado com sucesso!");
      handleCloseDialog();
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar a categoria");
    } finally {
      setIsLoading(false);
    }
  })

  return {
    form,
    isDialogOpen,
    editingCategory,
    isLoading,
    setIsDialogOpen,
    handleCloseDialog,
    handleSubmit,
    handleEdit,
    handleNew
  }
}