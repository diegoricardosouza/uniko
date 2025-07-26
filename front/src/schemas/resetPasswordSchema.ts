import z from "zod";

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, 'Senha precisa ter pelo menos 6 caracteres')
})