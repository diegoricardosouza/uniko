import z from "zod";

export const emailsSchema = z.object({
  htmlContent: z.string()
    .min(1, {
      message: "Conteúdo é de preenchimento obrigatório.",
    }),
})