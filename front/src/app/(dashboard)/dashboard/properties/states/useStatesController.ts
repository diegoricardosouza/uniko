/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStateAction } from "@/app/actions/states/create-state";
import { deleteStateAction } from "@/app/actions/states/delete-state";
import { getStateAction } from "@/app/actions/states/get-state";
import { updateStateAction } from "@/app/actions/states/update-state";
import { statesSchema } from "@/schemas/statesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof statesSchema>

export function useStatesController() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [idCategory, setIdCategory] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(statesSchema),
    defaultValues: {
      name: "",
      acronym: "",
    },
  });

  const handleNew = () => {
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      acronym: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = async (id: string) => {
    const state = await getStateAction(id);
    setIdCategory(id);
    setEditingCategory(true);
    form.reset({
      name: state.name ?? '',
      acronym: state.acronym ?? '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      acronym: '',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStateAction(id);
      toast.success('Estado excluído com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir o estado')
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)

      if (editingCategory) {
        await updateStateAction({
          ...data,
          acronym: data.acronym?.toUpperCase(),
          id: idCategory
        });
        toast.success("Estado atualizado com sucesso!");
      }

      if (!editingCategory) {
        await createStateAction({
          ...data,
          acronym: data.acronym?.toUpperCase()
        });
        toast.success("Estado cadastrado com sucesso!");
      }
      
      handleCloseDialog();
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar o estado");
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