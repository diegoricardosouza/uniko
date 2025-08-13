import z from "zod";

export const unitSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  cellphone: z.string().min(1, "Celular é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  service: z.string().optional(),
});