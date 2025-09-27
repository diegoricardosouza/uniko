import z from "zod";

export const procureSchema = z.object({
  type: z.string().min(1, {
    message: "Tipo do imóvel é de preenchimento obrigatório.",
  }),
  city: z.string().min(1, {
    message: "Cidade é de preenchimento obrigatório.",
  }),
  neighborhood: z.string().min(1, {
    message: "Bairro é de preenchimento obrigatório.",
  }),
  finality: z.string().min(1, {
    message: "Finalidade é de preenchimento obrigatório.",
  }),
  bedrooms: z.string().min(1, {
    message: "Selecione o número de dormitórios",
  }),
  parkingSpaces: z.string().min(1, {
    message: "Selecione o número de vagas",
  }),
  name: z.string().min(1, {
    message: "Nome de preenchimento obrigatório.",
  }),
  email: z.email({           // 3º: Valida formato do email
    message: "Por favor, insira um e-mail válido.",
  }).min(1, {
    message: "E-mail de preenchimento obrigatório.",
  }),
  phone: z.string().min(1, {
    message: "Celular de preenchimento obrigatório.",
  }),
  accept: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos para continuar.",
  }),
  observations: z.string().optional()
})