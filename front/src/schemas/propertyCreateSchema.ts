import z from "zod";

export const propertyCreateSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Título é de preenchimento obrigatório.",
    }),
  description: z.string().optional(),
  reference: z.string().min(1, {
    message: "Referência é de preenchimento obrigatório.",
  }),
  price: z.string().min(1, {
    message: "Preço é de preenchimento obrigatório.",
  }),
  priceCondominium: z.string().optional(),
  priceIptu: z.string().optional(),
  delivery: z.string().optional(),
  totalArea: z.string().min(1, {
    message: "Área Total é de preenchimento obrigatório.",
  }),
  privateArea: z.string().min(1, {
    message: "Área Privativa é de preenchimento obrigatório.",
  }),
  bedrooms: z.string().min(1, {
    message: "Quartos é de preenchimento obrigatório.",
  }),
  bathrooms: z.string().min(1, {
    message: "Banheiros é de preenchimento obrigatório.",
  }),
  parkingSpaces: z.string().min(1, {
    message: "Vagas de Garagem é de preenchimento obrigatório.",
  }),
  zipCode: z.string().min(1, {
    message: "CEP é de preenchimento obrigatório.",
  }),
  address: z.string().min(1, {
    message: "Endereço é de preenchimento obrigatório.",
  }),
  number: z.string().optional(),
  complement: z.string().optional(),
  featuredImage: z.custom<File | undefined | string>((file) => {
    if (file === undefined) return true; // permitir limpar
    return file instanceof File && file.size > 0;
  }, {
    message: "Por favor, selecione uma imagem de destaque válida.",
  }),
  city: z.string().min(1, {
    message: "Cidade é de preenchimento obrigatório.",
  }),
  neighborhood: z.string().min(1, {
    message: "Bairro é de preenchimento obrigatório.",
  }),
  types: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Selecione pelo menos um tipo.",
  }),
  finalities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Selecione pelo menos uma finalidade.",
  }),
  characteristics: z.array(
    z.object({
      name: z.string().min(1, 'Caracteristica deve ser preenchida')
    })
  ).optional(),
  infrastructures: z.array(
    z.object({
      name: z.string().min(1, 'Infraestrutura deve ser preenchida')
    })
  ).optional(),
  gallery: z.array(z.any()).optional().nullable(),
})