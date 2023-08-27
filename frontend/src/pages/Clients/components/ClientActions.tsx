import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { Client } from '../types';
import ClientDelete from './ClientDelete';
import ClientForm from './ClientForm';

interface ClientActionsProperties {
  row: Row<Client>;
}

export default function ClientActions({
  row: client,
}: ClientActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      <ClientForm defaultValues={client.original} />

      <ClientDelete client={client} />
    </div>
  );
}
