import { ColumnDef } from '@tanstack/react-table';
import { Service } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Client } from 'pages/Clients/types';
import { addDays, format, parseISO } from 'date-fns';
import ServiceActions from '../components/ServiceForm/ServiceActions';
import { Well } from 'pages/Wells/types';

export default function useServiceColumns(
  clients: Client[] | undefined,
  wells: Well[],
): ColumnDef<Service>[] {
  const clientsMap = clients
    ? new Map<string, Client>(
        clients.map((client) => [String(client.id), client]),
      )
    : new Map<string, Client>([]);

  const wellsMap = wells
    ? new Map<string, Well>(
        wells.map((well) => [String(well.proposalId), well]),
      )
    : new Map<string, Well>([]);

  const idCol: ColumnDef<Service> = {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  };

  const columns: ColumnDef<Service>[] = [
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
        const deliveryDate = wellsMap.get(
          String(row.original.id),
        )?.deliveryDate;

        return deliveryDate
          ? format(addDays(parseISO(deliveryDate), 1), 'dd/MM/yyyy')
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

  return import.meta.env.DEV ? [idCol, ...columns] : columns;
}
