/* eslint-disable react-hooks/exhaustive-deps */
import { generateIconSvg } from "@/lib/svg";
import { socialMediaSchema } from "@/schemas/socialMediaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { IconSpec } from "./_components/SocialIcon";

const formSchema = z.object({
  socials: z.array(socialMediaSchema).min(1, "Ao menos uma rede social é necessária"),
});

type FormData = z.infer<typeof formSchema>;

export function useSocialLinksController() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [svgCache, setSvgCache] = useState<Record<string, string>>({});

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socials: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const updateSvgCache = async (spec: IconSpec, index: number) => {
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
    const socialsWithSvg = await Promise.all(
      data.socials.map(async (social, index) => {
        const key = `${index}-${social.icon.library}-${social.icon.name}`;
        return {
          ...social,
          iconSvg: svgCache[key] || await generateIconSvg(social.icon)
        };
      })
    );

    console.log(socialsWithSvg);
  });

  return {
    form,
    fields,
    watchedSocials,
    pickerOpen,
    remove,
    addLink,
    onSubmit,
    setPickerOpen,
    handleSelectIcon,
    openPicker
  }
}