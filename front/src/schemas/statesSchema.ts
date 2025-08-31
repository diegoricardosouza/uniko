import z from "zod";

export const statesSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Nome é de preenchimento obrigatório.",
    }),
  acronym: z.string()
    .min(1, {
      message: "Sigla é de preenchimento obrigatório.",
    }),
})