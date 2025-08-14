import { createSettingAction } from "@/app/actions/settings/create-setting";
import { getUpdateSettingAction } from "@/app/actions/settings/update-setting";
import { Setting } from "@/entities/Setting";
import { unitSchema } from "@/schemas/unitSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  units: z.array(unitSchema).min(1, "Ao menos uma unidade é necessária"),
});

type FormData = z.infer<typeof formSchema>

export function useCompanyUnitsController(setting: Setting[]) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: [],
    },
  })

  useEffect(() => {
    if (setting.length > 0) {
      form.reset({
        units: setting[0].unitCompany?.map((unit) => ({
          name: unit.name ?? "",
          email: unit.email ?? "",
          phone: unit.telephone ?? "",
          cellphone: unit.cellphone ?? "",
          address: unit.address ?? "",
          service: unit.service ?? "",
        }))
      })
    }
  }, [form, setting])

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "units",
  });

  const addUnit = () =>
    append({
      name: "",
      email: "",
      phone: "",
      cellphone: "",
      address: "",
      service: "",
    });

  const watchedUnits = useWatch({
    control,
    name: "units",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    if (setting.length > 0) {
      try {
        const payload = {
          id: setting[0].id,
          unitCompany: data.units.map((unit) => ({
            name: unit.name,
            email: unit.email,
            telephone: unit.phone,
            cellphone: unit.cellphone,
            service: unit.service,
            address: unit.address
          }))
        }
        await getUpdateSettingAction(payload);
        toast.success("As informações das unidades foram atualizadas com sucesso.");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      return
    }

    try {
      const payload = {
        unitCompany: data.units.map((unit) => ({
          name: unit.name,
          email: unit.email,
          telephone: unit.phone,
          cellphone: unit.cellphone,
          service: unit.service,
          address: unit.address
        }))
      }
      await createSettingAction(payload);
      toast.success("As informações das unidades foram atualizadas com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  })

  return {
    form,
    fields,
    watchedUnits,
    control,
    isLoading,
    remove,
    addUnit,
    onSubmit
  }
}