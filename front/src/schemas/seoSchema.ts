import z from "zod";

export const seoSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(60, "Máximo 60 caracteres"),
  description: z.string().min(1, "Descrição é obrigatório").max(256, "Máximo 256 caracteres"),
  urlYoutube: z.url("URL inválida").optional()
});