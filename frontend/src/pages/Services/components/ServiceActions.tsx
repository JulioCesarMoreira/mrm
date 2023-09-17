import DeleteDialog from '@components/ui/delete-dialog';
import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { ServiceProposal } from '../types';
import { toggleFetchServices } from 'constants/atoms';

interface ServiceActionsProperties {
  row: Row<ServiceProposal>;
}

export default function ServiceActions({
  row: service,
}: ServiceActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      {/* <ClientForm defaultValues={client.original} /> */}

      <DeleteDialog
        deleteMessage="Você está prestes a excluir este serviço."
        entity="Serviço"
        id={service.original.id}
        route="http://localhost:3000/proposal"
        toggleFetchEntity={toggleFetchServices}
      />
    </div>
  );
}
