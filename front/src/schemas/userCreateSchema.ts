import z from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres.",
  }),
  active: z.boolean().default(true).optional(),
  role: z.enum(["ADMIN", "EDITOR"], {
    error: "Por favor, selecione um nível de acesso.",
  }),
})