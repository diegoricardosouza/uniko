import { IconSpec } from "@/app/(dashboard)/dashboard/settings/_components/SocialIcon";
import z from "zod";

const iconSpecSchema = z.union([
  z.discriminatedUnion("library", [
    z.object({
      library: z.literal("lucide"),
      name: z.string().min(1, "Nome do ícone é obrigatório"),
    }),
    z.object({
      library: z.literal("react-icons"),
      pack: z.enum(["fa", "ai", "bs", "ci"]),
      name: z.string().min(1, "Nome do ícone é obrigatório"),
    }),
  ]),
  z.string().min(1, "Ícone (string) é obrigatório"),
]) satisfies z.ZodType<IconSpec | string>;

export const socialMediaSchema = z.object({
  label: z.string().min(1, "Nome é obrigatório"),
  url: z.url("URL inválida").min(1, "Url é obrigatório"),
  icon: iconSpecSchema,
  iconSvg: z.string().optional(),
  iconJson: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Must be a valid JSON string" }).optional()
});