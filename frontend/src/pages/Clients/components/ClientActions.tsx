import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { Client } from '../types';
import ClientForm from './ClientForm';
import { toggleFetchClients } from 'constants/atoms';
import DeleteDialog from '@components/ui/delete-dialog';

interface ClientActionsProperties {
  row: Row<Client>;
}

export default function ClientActions({
  row: client,
}: ClientActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      <ClientForm defaultValues={client.original} />

      <DeleteDialog
        deleteMessage={`Você está prestes a excluir o cliente ${client.original.name}.`}
        entity="Cliente"
        id={client.original.id}
        route="http://localhost:3000/client"
        toggleFetchEntity={toggleFetchClients}
      />
    </div>
  );
}
