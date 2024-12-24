import React from "react";
import { useDisclosure } from "~/hooks/use-disclosure";
import { AddCharacteristicDialog } from "./add-characteristic-dialog";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { type Nullable } from "~/types";
import { type Characteristic } from "../types";

type AddCharacteristicProps = {
  data?: Nullable<Characteristic>;
  resetSelectedCharacteristic: () => void;
};
export const AddCharacteristic: React.FC<AddCharacteristicProps> = ({
  data,
  resetSelectedCharacteristic,
}) => {
  const addDialog = useDisclosure();

  const onCloseAddDialog = () => {
    if (data) {
      resetSelectedCharacteristic();
    }

    addDialog.onClose();
  };

  return (
    <>
      <Button onClick={addDialog.onOpen}>
        <PlusIcon />
        Adicionar
      </Button>

      <AddCharacteristicDialog
        dialogActionTitle={data ? "Editar" : "Adicionar"}
        isOpen={addDialog.isOpen || !!data}
        onClose={onCloseAddDialog}
        data={data}
      />
    </>
  );
};
