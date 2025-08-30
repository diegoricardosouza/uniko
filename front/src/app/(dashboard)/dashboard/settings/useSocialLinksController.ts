/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { createSettingAction } from "@/app/actions/settings/create-setting";
import { getUpdateSettingAction } from "@/app/actions/settings/update-setting";
import { Setting, SocialMediaProps } from "@/entities/Setting";
import { generateIconSvg } from "@/lib/svg";
import { socialMediaSchema } from "@/schemas/socialMediaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { IconSpec } from "./_components/SocialIcon";

const formSchema = z.object({
  socials: z.array(socialMediaSchema).min(1, "Ao menos uma rede social é necessária"),
});

type FormData = z.infer<typeof formSchema>;

export function useSocialLinksController(setting: Setting[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [svgCache, setSvgCache] = useState<Record<string, string>>({});

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socials: [],
    },
  });

  useEffect(() => {
    if (setting.length > 0) {
      if (!setting[0].socialMedia) return;

      form.reset({
        socials: setting[0].socialMedia?.map((social: SocialMediaProps) => ({
          label: social.name ?? "",
          url: social.url ?? "",
          // icon: social.icon ?? "",
          icon: social.iconJson as string | undefined,
        }))
      })
    }

  }, [form, setting])

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const updateSvgCache = async (spec: IconSpec | string, index: number) => {
    if (typeof spec === 'string') return null as any;
    const key = `${index}-${spec.library}-${spec.name}`;

    if (!svgCache[key]) {
      const svg = await generateIconSvg(spec);
      setSvgCache(prev => ({ ...prev, [key]: svg }));
    }
  };

  useEffect(() => {
    const socials = form.getValues("socials");
    socials.forEach((social, index) => {
      if (social.icon) {
        updateSvgCache(social.icon, index);
      }
    });
  }, [form.watch("socials")]);

  const watchedSocials = useWatch({
    control,
    name: "socials",
  });

  const addLink = () => {
    append({
      label: "",
      url: "",
      icon: { library: "lucide", name: "globe" },
    });
  };

  const openPicker = (index: number) => {
    setActiveIndex(index);
    setPickerOpen(true);
  };

  const handleSelectIcon = (icon: IconSpec) => {
    if (activeIndex !== null) {
      form.setValue(`socials.${activeIndex}.icon`, icon);
      setPickerOpen(false);
      setActiveIndex(null);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    if (setting.length > 0) {
      try {
        const socialsWithSvg = await Promise.all(
          data.socials.map(async (social, index) => {
            if (typeof social.icon === 'string') return null as any;

            const key = `${index}-${social.icon?.library}-${social.icon?.name}`;
            return {
              name: social.label,
              url: social.url,
              icon: svgCache[key] || await generateIconSvg(social.icon),
              iconJson: social.icon,
            };
          })
        );

        const payload = {
          id: setting[0].id,
          socialMedia: socialsWithSvg
        }
        await getUpdateSettingAction(payload);
        toast.success("As informações das redes sociais foram atualizadas com sucesso.");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      return
    }

    try {
      const socialsWithSvg = await Promise.all(
        data.socials.map(async (social, index) => {
          if (typeof social.icon === 'string') return null as any;

          const key = `${index}-${social.icon?.library}-${social.icon?.name}`;
          return {
            name: social.label,
            url: social.url,
            icon: svgCache[key] || await generateIconSvg(social.icon),
            iconJson: social.icon,
          };
        })
      );
      const payload = {
        socialMedia: socialsWithSvg
      }
      await createSettingAction(payload);
      toast.success("As informações das redes sociais foram atualizadas com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    fields,
    watchedSocials,
    pickerOpen,
    isLoading,
    remove,
    addLink,
    onSubmit,
    setPickerOpen,
    handleSelectIcon,
    openPicker
  }
}