/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFinalityAction } from "@/app/actions/finalities/create-finality";
import { deleteFinalityAction } from "@/app/actions/finalities/delete-finality";
import { getFinalityAction } from "@/app/actions/finalities/get-finality";
import { updateFinalityAction } from "@/app/actions/finalities/update-finality";
import { finalitiesSchema } from "@/schemas/finalitiesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof finalitiesSchema>

export function useFinalitiesController() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [idCategory, setIdCategory] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(finalitiesSchema),
    defaultValues: {
      name: ""
    },
  });

  const handleNew = () => {
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = async (id: string) => {
    const state = await getFinalityAction(id);
    setIdCategory(id);
    setEditingCategory(true);
    form.reset({
      name: state.name ?? ''
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: ''
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFinalityAction(id);
      toast.success('Finalidade excluída com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir a finalidade')
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)

      if (editingCategory) {
        await updateFinalityAction({
          ...data,
          id: idCategory
        });
        toast.success("Finalidade atualizada com sucesso!");
      }

      if (!editingCategory) {
        await createFinalityAction({
          ...data
        });
        toast.success("Finalidade cadastrada com sucesso!");
      }
      
      handleCloseDialog();
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar a finalidade");
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
    handleNew,
    handleDelete
  }
}