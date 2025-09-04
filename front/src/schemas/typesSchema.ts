import z from "zod";

export const typesSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Nome é de preenchimento obrigatório.",
    })
})