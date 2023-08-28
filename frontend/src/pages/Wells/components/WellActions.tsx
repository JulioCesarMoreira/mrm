import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { Well } from '../types';
import WellForm from './WellForm';
import DeleteDialog from '@components/ui/delete-dialog';
import { toggleFetchWells } from 'constants/atoms';

interface WellActionsProperties {
  row: Row<Well>;
}

export default function WellActions({
  row: well,
}: WellActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      <WellForm defaultValues={well.original} />

      <DeleteDialog
        deleteMessage="Você está prestes a excluir esse poço."
        entity="Poço"
        id={well.original.id}
        route="http://localhost:3000/well"
        toggleFetchEntity={toggleFetchWells}
      />
    </div>
  );
}