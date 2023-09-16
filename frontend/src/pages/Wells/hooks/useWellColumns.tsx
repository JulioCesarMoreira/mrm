import { ColumnDef } from '@tanstack/react-table';
import { Well } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import WellActions from '../components/WellForm/WellActions';
import { format, parseISO } from 'date-fns';

export default function useWellColumns(): ColumnDef<Well>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'clientName',
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
        <div className="lowercase">{row.getValue('clientName')}</div>
      ),
    },
    {
      accessorKey: 'deliveryDate',
      header: () => <div className="text-center">Data de Entrega</div>,
      cell: ({ row }) => {
        const deliveryDate = row.getValue('deliveryDate') as string;

        const isoDate = parseISO(deliveryDate);
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
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.street}, {row.original.number}, {row.original.distric}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <WellActions row={row} />;
      },
    },
  ];
}
