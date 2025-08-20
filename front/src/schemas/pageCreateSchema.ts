import z from "zod";

export const pageCreateSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Título é de preenchimento obrigatório.",
    }),
  featuredImage: z.custom<File | undefined | string>((file) => {
    if (file === undefined) return true; // permitir limpar
    return file instanceof File && file.size > 0;
  }, {
    message: "Por favor, selecione uma imagem de destaque válida.",
  }),
  content: z.string().optional()
})