import { ColumnDef } from '@tanstack/react-table';
import { Client } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import ClientActions from '../components/ClientActions';
import NumberFormat from 'react-number-format';
import { formatPhone } from 'constants/index';

export default function useClientColumns(): ColumnDef<Client>[] {
  const idCol: ColumnDef<Client> = {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  };

  const columns: ColumnDef<Client>[] = [
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'contactName',
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
              Contato
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </Tooltip>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('contactName')}</div>
      ),
    },
    {
      accessorKey: 'cpfCnpj',
      header: () => <div className="text-center">Documento do cliente</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <NumberFormat
              value={row.getValue('cpfCnpj')}
              format={
                (row.getValue('cpfCnpj') as string).length <= 11
                  ? '###.###.###-#####'
                  : '##.###.###/####-##'
              }
              displayType="text"
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'contactPhone',
      header: () => <div className="text-center">Telefone</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {formatPhone(row.getValue('contactPhone'))}
          </div>
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

  return import.meta.env.DEV ? [idCol, ...columns] : columns;
}
