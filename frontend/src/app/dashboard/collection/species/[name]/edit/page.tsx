import { SpecieForm } from "../../components/form/specie-form";

export default function Page() {
  return (
    <SpecieForm
      title="Editar"
      data={{
        commonName: "Açaí",
        scientificName: "Euterpe oleracea",
        description: "Açaí é uma palmeira encontrada na região amazônica.",
        images: ["https://picsum.photos/200/300"],
        taxonomyId: { value: "1", label: "Arecaceae" },
        characteristics: [
          { value: "1", label: "Frutos" },
          { value: "2", label: "Folhas" },
        ],
      }}
    />
  );
}
