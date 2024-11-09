import { CharacteristicForm } from "../../components/form/characteristic-form";

export default function Page() {
  return (
    <CharacteristicForm
      title="Editar"
      data={{
        description: "Cor do animal",
        name: "Cor",
        type: "String",
        images: [],
      }}
    />
  );
}
