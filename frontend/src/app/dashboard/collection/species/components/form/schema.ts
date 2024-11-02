import { z } from "zod";

export const formSpecieSchema = z.object({
  commonName: z.string({ required_error: "Campo obrigatório" }),
  scientificName: z.string({
    required_error: "Campo obrigatório",
  }),
  description: z.string(),
  images: z.array(z.string()).min(1, "Adicione ao menos uma imagem"),
  division: z.object({ value: z.string(), label: z.string() }),
  class: z.object({ value: z.string(), label: z.string() }),
  order: z.object({ value: z.string(), label: z.string() }),
  family: z.object({ value: z.string(), label: z.string() }),
  genus: z.object({ value: z.string(), label: z.string() }),
});

export type SpecieFormType = z.infer<typeof formSpecieSchema>;
