import { seoSchema } from "@/schemas/seoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type FormData = z.infer<typeof seoSchema>;

export function useSeoController() {
  const form = useForm<FormData>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return {
    form,
    onSubmit
  }
}