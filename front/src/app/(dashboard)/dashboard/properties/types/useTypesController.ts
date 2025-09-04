/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTypeAction } from "@/app/actions/types/create-type";
import { deleteTypeAction } from "@/app/actions/types/delete-type";
import { getTypeAction } from "@/app/actions/types/get-type";
import { updateTypeAction } from "@/app/actions/types/update-type";
import { typesSchema } from "@/schemas/typesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof typesSchema>

export function useTypesController() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [idCategory, setIdCategory] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(typesSchema),
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
    const state = await getTypeAction(id);
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
      await deleteTypeAction(id);
      toast.success('Tipo excluído com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir o tipo')
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)

      if (editingCategory) {
        await updateTypeAction({
          ...data,
          id: idCategory
        });
        toast.success("Tipo atualizado com sucesso!");
      }

      if (!editingCategory) {
        await createTypeAction({
          ...data
        });
        toast.success("Tipo cadastrado com sucesso!");
      }
      
      handleCloseDialog();
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar o tipo");
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