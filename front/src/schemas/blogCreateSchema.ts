import z from "zod";

export const blogCreateSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Título é de preenchimento obrigatório.",
    }),
  subtitle: z
    .string()
    .optional(),
  featuredImage: z.string().min(1, {
    message: "Por favor, selecione uma imagem de destaque.",
  }),
  content: z.string().optional(),
  categories: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Selecione pelo menos uma categoria.",
  }),
})