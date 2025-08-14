import { createSettingAction } from "@/app/actions/settings/create-setting";
import { getUpdateSettingAction } from "@/app/actions/settings/update-setting";
import { Setting } from "@/entities/Setting";
import { seoSchema } from "@/schemas/seoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof seoSchema>;

export function useSeoController(setting: Setting[]) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  });

  useEffect(() => {
    if (setting.length > 0) {
      form.reset({
        title: setting[0].titleSeo,
        description: setting[0].descriptionSeo
      })
    }
  }, [form, setting]);
  
  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    if (setting.length > 0) {
      try {
        const payload = {
          id: setting[0].id,
          titleSeo: data.title,
          descriptionSeo: data.description
        }
        await getUpdateSettingAction(payload);
        toast.success("As informações de SEO foram atualizadas com sucesso.");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      return
    }

    try {
      const payload = {
        titleSeo: data.title,
        descriptionSeo: data.description
      }
      await createSettingAction(payload);
      toast.success("As informações de SEO foram atualizadas com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    onSubmit,
    isLoading
  }
}