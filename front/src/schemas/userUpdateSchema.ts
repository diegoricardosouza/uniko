import z from "zod";

export const userUpdateSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.union([
    z.string().min(6, "A senha deve conter pelo menos 6 dígitos"),
    z.string().optional(),
    z.null()
  ]),
  active: z.boolean().default(true).optional(),
  role: z.enum(["ADMIN", "EDITOR"], {
    error: "Por favor, selecione um nível de acesso.",
  }),
})