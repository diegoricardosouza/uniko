import z from "zod";

export const vistoriasSchema = z.object({
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
  codeContract: z.string().min(1, {
    message: "Código do Contrato é de preenchimento obrigatório.",
  }),
  message: z.string().optional(),
})