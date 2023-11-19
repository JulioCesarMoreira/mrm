import { ColumnDef } from '@tanstack/react-table';
import { Well } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import WellActions from '../components/WellForm/WellActions';
import { addDays, format, parseISO } from 'date-fns';

export default function useWellColumns(): ColumnDef<Well>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'client.name',
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
              ref={undefined}
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
      cell: ({ row }) => (
        <div className="lowercase">{row.original.client.name}</div>
      ),
    },
    {
      accessorKey: 'deliveryDate',
      header: () => <div className="text-center">Data de Entrega</div>,
      cell: ({ row }) => {
        const deliveryDate = row.getValue('deliveryDate') as string;

        const isoDate = addDays(parseISO(deliveryDate), 1);
        return (
          <div className="text-center">{format(isoDate, 'dd/MM/yyyy')}</div>
        );
      },
    },
    {
      accessorKey: 'voltage',
      header: ({ column }) => {
        return (
          <div className="text-center">
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
              >
                Voltagem
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue('voltage')}</div>;
      },
    },
    {
      accessorKey: 'street',
      header: () => <div className="text-center">Endereço</div>,
      cell: ({ row }) => {
        const address = {
          street: row.original.street,
          number: row.original.number,
          distric: row.original.distric,
          city: row.original.city.name,
          uf: row.original.city.uf,
        };

        const stringAddress = Object.values(address).reduce(
          (accumulator, currentValue) => {
            if (currentValue) {
              if (accumulator) {
                return `${accumulator}, ${currentValue}`;
              } else {
                return currentValue;
              }
            } else {
              return accumulator;
            }
          },
          '',
        );

        return <div className="text-center">{stringAddress}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <WellActions row={row} />;
      },
    },
  ];
}
