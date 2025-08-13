import { IconSpec } from "@/app/(dashboard)/dashboard/settings/_components/SocialIcon";
import z from "zod";

const iconSpecSchema = z.discriminatedUnion("library", [
  z.object({
    library: z.literal("lucide"),
    name: z.string().min(1, "Nome do ícone é obrigatório"),
  }),
  z.object({
    library: z.literal("react-icons"),
    pack: z.enum(["fa", "ai", "bs", "ci"]),
    name: z.string().min(1, "Nome do ícone é obrigatório"),
  }),
]) satisfies z.ZodType<IconSpec>;

export const socialMediaSchema = z.object({
  label: z.string().min(1, "Nome é obrigatório"),
  url: z.url("URL inválida").min(1, "Url é obrigatório"),
  icon: iconSpecSchema,
  iconSvg: z.string().optional()
});