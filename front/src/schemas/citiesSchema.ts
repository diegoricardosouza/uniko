import z from "zod";

export const citiesSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Nome é de preenchimento obrigatório.",
    }),
  stateId: z.string()
    .min(1, {
      message: "Estado é de preenchimento obrigatório.",
    }),
})