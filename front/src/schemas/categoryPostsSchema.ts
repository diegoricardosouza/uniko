import z from "zod";

export const categoryPostsSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Nome é de preenchimento obrigatório.",
    }),
  description: z.string()
    .optional(),
})