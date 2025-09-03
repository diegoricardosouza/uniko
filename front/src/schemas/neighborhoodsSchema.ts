import z from "zod";

export const neighborhoodsSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Nome é de preenchimento obrigatório.",
    }),
  cityId: z.string()
    .min(1, {
      message: "Cidade é de preenchimento obrigatório.",
    }),
})