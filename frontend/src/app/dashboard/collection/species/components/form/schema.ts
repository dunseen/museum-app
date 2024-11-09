import { z } from "zod";

export const formSpecieSchema = z.object({
  commonName: z.string({ required_error: "Campo obrigatório" }),
  scientificName: z.string({
    required_error: "Campo obrigatório",
  }),
  description: z.string({
    required_error: "Campo obrigatório",
  }),
  images: z.array(z.string(), {
    required_error: "Campo obrigatório",
  }),
  taxonomyId: z.object(
    { value: z.string(), label: z.string() },
    {
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo obrigatório",
    },
  ),
  characteristics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export type SpecieFormType = z.infer<typeof formSpecieSchema>;
