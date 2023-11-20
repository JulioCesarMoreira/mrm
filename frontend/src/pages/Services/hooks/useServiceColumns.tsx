import { ColumnDef } from '@tanstack/react-table';
import { Service } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Client } from 'pages/Clients/types';
import { format, parseISO } from 'date-fns';
import ServiceActions from '../components/ServiceForm/ServiceActions';

export default function useServiceColumns(
  clients: Client[] | undefined,
): ColumnDef<Service>[] {
  const clientsMap = clients
    ? new Map<string, Client>(
        clients.map((client) => [String(client.id), client]),
      )
    : new Map<string, Client>([]);

  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'clientId',
      header: ({ column }) => {
        return (
          <Tooltip
            position="top"
            text={
              column.getIsSorted() === 'asc'
                ? 'Ordenar decrescente'
                : 'Ordenar crescente'
            }
          >
            <Button
              ref={undefined}
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
              className="px-0"
            >
              Cliente
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </Tooltip>
        );
      },
      cell: ({ row }) => clientsMap.get(String(row.original.clientId))?.name,
    },
    {
      accessorKey: 'sendDate',
      header: ({ column }) => {
        return (
          <Tooltip
            position="top"
            text={
              column.getIsSorted() === 'asc'
                ? 'Ordenar decrescente'
                : 'Ordenar crescente'
            }
          >
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
              className="px-0"
            >
              Data de entrega
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </Tooltip>
        );
      },
      cell: ({ row }) => {
        const sendDate = row.getValue('sendDate');

        return sendDate
          ? format(parseISO(row.getValue('sendDate')), 'dd/MM/yyyy')
          : '-';
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <ServiceActions row={row} />;
      },
    },
  ];
}
