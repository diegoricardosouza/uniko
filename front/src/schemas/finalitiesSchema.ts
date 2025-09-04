import z from "zod";

export const finalitiesSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Nome é de preenchimento obrigatório.",
    })
})