import z from "zod";

export const pageUpdateSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Título é de preenchimento obrigatório.",
    }),
  featuredImage: z .any()
    .optional()
    .refine(
      (file) => {
        // Se não tiver nada, ok
        if (!file) return true;

        // Se for um objeto File (no browser)
        if (typeof File !== "undefined" && file instanceof File) {
          return file.size > 0;
        }

        // Se for string (URL da imagem antiga)
        if (typeof file === "string") {
          return file.length > 0;
        }

        return false;
      },
      { message: "Por favor, selecione uma imagem de destaque válida." }
    ),
  content: z.string().optional()
})