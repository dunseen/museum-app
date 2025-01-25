import React from "react";
import { useDisclosure } from "~/hooks/use-disclosure";
import { AddTaxonomyDialog } from "./add-taxonomy-dialog";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { type Nullable } from "~/types";
import { type Taxonomy } from "../types";

type AddTaxonomyProps = {
  data?: Nullable<Taxonomy>;
  resetSelectedTaxonomy: () => void;
};
export const AddTaxonomy: React.FC<AddTaxonomyProps> = ({
  data,
  resetSelectedTaxonomy,
}) => {
  const addDialog = useDisclosure();

  const onCloseAddDialog = () => {
    if (data) {
      resetSelectedTaxonomy();
    }

    addDialog.onClose();
  };

  return (
    <>
      <Button onClick={addDialog.onOpen}>
        <PlusIcon />
        Adicionar
      </Button>

      <AddTaxonomyDialog
        dialogActionTitle={data ? "Editar" : "Adicionar"}
        isOpen={addDialog.isOpen || !!data}
        onClose={onCloseAddDialog}
        data={data}
      />
    </>
  );
};
