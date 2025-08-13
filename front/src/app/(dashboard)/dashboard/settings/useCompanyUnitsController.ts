import { unitSchema } from "@/schemas/unitSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  units: z.array(unitSchema).min(1, "Ao menos uma unidade é necessária"),
});

type FormData = z.infer<typeof formSchema>

export function useCompanyUnitsController() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: [],
    },
  })

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
      address: "",
      service: "",
    });

  const watchedUnits = useWatch({
    control,
    name: "units",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    toast.success("As informações das unidades foram atualizadas com sucesso.");
  })

  return {
    form,
    fields,
    watchedUnits,
    control,
    remove,
    addUnit,
    onSubmit
  }
}