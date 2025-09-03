/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCitiesAction } from "@/app/actions/cities/get-cities";
import { createNeighborhoodAction } from "@/app/actions/neighborhoods/create-neighborhood";
import { deleteNeighborhoodAction } from "@/app/actions/neighborhoods/delete-neighborhood";
import { getNeighborhoodAction } from "@/app/actions/neighborhoods/get-neighborhood";
import { updateNeighborhoodAction } from "@/app/actions/neighborhoods/update-neighborhood";
import { City } from "@/entities/City";
import { neighborhoodsSchema } from "@/schemas/neighborhoodsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof neighborhoodsSchema>

export function useNeighborhoodsController() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [idCategory, setIdCategory] = useState('');
  const [cities, setCities] = useState<City[] | null>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(neighborhoodsSchema),
    defaultValues: {
      name: "",
      cityId: "",
    },
  });

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await getCitiesAction();
      setCities(cities);
    }

    fetchCities();
  }, [])

  const handleNew = () => {
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      cityId: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = async (id: string) => {
    const city = await getNeighborhoodAction(id);
    setIdCategory(id);
    setEditingCategory(true);
    form.reset({
      name: city.name ?? '',
      cityId: city.city?.id ?? '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(false);
    setIdCategory('');
    form.reset({
      name: '',
      cityId: '',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNeighborhoodAction(id);
      toast.success('Bairro excluído com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir o bairro')
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)

      if (editingCategory) {
        await updateNeighborhoodAction({
          ...data,
          id: idCategory
        });
        toast.success("Bairro atualizado com sucesso!");
      }

      if (!editingCategory) {
        await createNeighborhoodAction({
          ...data
        });
        toast.success("Bairro cadastrado com sucesso!");
      }
      
      handleCloseDialog();
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar o bairro");
    } finally {
      setIsLoading(false);
    }
  })

  return {
    form,
    isDialogOpen,
    editingCategory,
    isLoading,
    cities,
    setIsDialogOpen,
    handleCloseDialog,
    handleSubmit,
    handleEdit,
    handleNew,
    handleDelete
  }
}