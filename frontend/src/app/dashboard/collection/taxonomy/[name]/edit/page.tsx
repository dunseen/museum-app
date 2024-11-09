import { TaxonomyForm } from "../../components/form/taxonomy-form";

export default function Page() {
  return (
    <TaxonomyForm
      title="Editar"
      data={{
        hierarchy: {
          value: "1",
          label: "Reino",
        },
        name: "Plantae",
        characteristics: [
          { label: "Característica 1", value: "1" },
          { label: "Característica 2", value: "2" },
        ],
      }}
    />
  );
}
