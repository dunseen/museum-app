import { z } from "zod";

export const formCharacteristicSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  type: z.string({
    required_error: "Campo obrigatório",
  }),
  description: z.string(),
  images: z.array(z.string()).min(1, "Adicione ao menos uma imagem"),
});

export type CharacteristicFormType = z.infer<typeof formCharacteristicSchema>;
