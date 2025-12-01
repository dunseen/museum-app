import React from 'react';
import { useDisclosure } from '~/hooks/use-disclosure';
import { AddSpecieDialog } from './add-specie-dialog';
import { Button } from '~/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { type Nullable } from '~/types';
import { type GetSpecieApiResponse } from '~/app/museu/herbario/types/specie.types';

type AddSpecieProps = {
  data?: Nullable<GetSpecieApiResponse>;
  resetSelectedSpecie: () => void;
};
export const AddSpecie: React.FC<AddSpecieProps> = ({
  data,
  resetSelectedSpecie,
}) => {
  const addDialog = useDisclosure();

  const onCloseAddDialog = () => {
    if (data) {
      resetSelectedSpecie();
    }

    addDialog.onClose();
  };

  return (
    <>
      <Button onClick={addDialog.onOpen}>
        <PlusIcon />
        Adicionar
      </Button>

      <AddSpecieDialog
        dialogActionTitle={data ? 'Editar' : 'Adicionar'}
        isOpen={addDialog.isOpen || !!data}
        onClose={onCloseAddDialog}
        data={data}
      />
    </>
  );
};
