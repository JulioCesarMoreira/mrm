import { ColumnDef } from '@tanstack/react-table';
import { Well } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import WellActions from '../components/WellActions';

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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
        return (
          <div className="text-center">{row.getValue('deliveryDate')}</div>
        );
      },
    },
    {
      accessorKey: 'voltage',
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
            >
              Voltagem
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </Tooltip>
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
        return <div className="text-center">{row.getValue('street')}</div>;
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
