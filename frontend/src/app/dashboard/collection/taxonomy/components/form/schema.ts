import { z } from "zod";

export const formTaxonomySchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  hierarchy: z.object(
    { value: z.string(), label: z.string() },
    {
      required_error: "Campo obrigatório",
    },
  ),
  parentId: z.string().optional(),
  characteristics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export type TaxonomyFormType = z.infer<typeof formTaxonomySchema>;
