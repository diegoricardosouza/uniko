import z from "zod";

export const contatoSchema = z.object({
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
  message: z.string().optional(),
})