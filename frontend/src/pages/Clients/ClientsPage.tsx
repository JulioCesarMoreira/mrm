import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Client } from './types';
import Tooltip from '@components/Tooltip/Tooltip';
import DataTable from '@components/DataTable/DataTable';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import ClientsForm from './components/ClientsForm';
import RowActions from './components/RowActions';
import { data } from './mock';
import Filters from './components/Filters';

const columns: ColumnDef<Client>[] = [
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
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </Tooltip>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>,
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
      return <div className="text-center">{row.getValue('contactPhone')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RowActions row={row} />;
    },
  },
];

export default function ClientsPage() {
  return (
    <div className="flex w-full flex-col">
      <Filters />

      <div className="w-full px-10 pb-10">
        <Dialog>
          <DataTableTitle
            title={'Clientes'}
            addElementButtonLabel="Adicionar cliente"
          />
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Adicionar cliente</DialogTitle>
              <hr className="w-full" />
              <ClientsForm
                defaultValues={{ contactPhone: '', cpfCnpj: '', name: '' }}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
