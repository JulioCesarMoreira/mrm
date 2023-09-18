import DeleteDialog from '@components/ui/delete-dialog';
import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { Service } from '../types';
import { toggleFetchServices } from 'constants/atoms';
import { Button } from '@components/ui/button';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceActionsProperties {
  row: Row<Service>;
}

export default function ServiceActions({
  row: service,
}: ServiceActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      <Link to={`/servicos/editar/${service.original.id}`}>
        <Button variant="ghost" className="group hover:bg-transparent">
          <Pencil
            size={18}
            color="#797E86"
            className="group-hover:stroke-hidro-blue-300 duration-200"
          />
        </Button>
      </Link>

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
