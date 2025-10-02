import z from "zod";

export const fundosReservasSchema = z.object({
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
  month: z.string().min(1, {
    message: "Mês do Condomínio é de preenchimento obrigatório.",
  }),
  maturity: z.string().min(1, {
    message: "Vencimento Condomínio é de preenchimento obrigatório.",
  }),
  message: z.string().optional(),
  file1: z.custom<File | undefined | string>((file) => {
    if (file === undefined) return; // permitir limpar
    return file instanceof File && file.size > 0;
  }, {
    message: "Por favor, selecione um arquivo.",
  }),
  file2: z.custom<File | undefined | string>((file) => {
    if (file === undefined) return; // permitir limpar
    return file instanceof File && file.size > 0;
  }, {
    message: "Por favor, selecione um arquivo.",
  }),
})