import { ColumnDef } from '@tanstack/react-table';
import { Client } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import ClientActions from '../components/ClientActions';

export default function useClientsColumns(): ColumnDef<Client>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
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
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </Tooltip>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'cpfCnpj',
      header: () => <div className="text-center">CPF / CNPJ</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue('cpfCnpj')}</div>;
      },
    },
    {
      accessorKey: 'contactPhone',
      header: () => <div className="text-center">Telefone</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue('contactPhone')}</div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <ClientActions row={row} />;
      },
    },
  ];
}
