/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCityAction } from "@/app/actions/cities/create-city";
import { deleteCityAction } from "@/app/actions/cities/delete-city";
import { getCityAction } from "@/app/actions/cities/get-city";
import { updateCityAction } from "@/app/actions/cities/update-city";
import { getStatesAction } from "@/app/actions/states/get-states";
import { State } from "@/entities/State";
import { citiesSchema } from "@/schemas/citiesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof citiesSchema>

export function useCitiesController() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [idCategory, setIdCategory] = useState('');
  const [states, setStates] = useState<State[] | null>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(citiesSchema),
    defaultValues: {
      name: "",
      stateId: "",
    },
  });

  useEffect(() => {
    const fetchStates = async () => {
      const states = await getStatesAction();
      setStates(states);
    }

    fetchStates();
  }, [])

  const handleNew = () => {
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      stateId: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = async (id: string) => {
    const city = await getCityAction(id);
    setIdCategory(id);
    setEditingCategory(true);
    form.reset({
      name: city.name ?? '',
      stateId: city.state?.id ?? '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      stateId: '',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCityAction(id);
      toast.success('Cidade excluída com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir a cidade')
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)

      if (editingCategory) {
        await updateCityAction({
          ...data,
          id: idCategory
        });
        toast.success("Cidade atualizada com sucesso!");
      }

      if (!editingCategory) {
        await createCityAction({
          ...data
        });
        toast.success("Cidade cadastrada com sucesso!");
      }
      
      handleCloseDialog();
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar a cidade");
    } finally {
      setIsLoading(false);
    }
  })

  return {
    form,
    isDialogOpen,
    editingCategory,
    isLoading,
    states,
    setIsDialogOpen,
    handleCloseDialog,
    handleSubmit,
    handleEdit,
    handleNew,
    handleDelete
  }
}