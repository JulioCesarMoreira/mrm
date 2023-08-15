import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Client } from './types';
import Tooltip from '@components/Tooltip/Tooltip';
import DataTable from '@components/DataTable/DataTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

const data: Client[] = [
  {
    id: 'm5gr84i9',
    name: 'Henrique Luhm 1',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '3u1reuv4',
    name: 'Henrique Luhm 2',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },

  {
    id: '5kma53ae',
    name: 'Henrique Luhm 4',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: 'bhqecj4p',
    name: 'Henrique Luhm 5',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '3u1reuv4',
    name: 'Henrique Luhm 2',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '5kma53ae',
    name: 'Henrique Luhm 4',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: 'bhqecj4p',
    name: 'Henrique Luhm 5',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '3u1reuv4',
    name: 'Henrique Luhm 2',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '3u1reuv4',
    name: 'Henrique Luhm 2',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
];

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
      return (
        <div className="flex-center">
          <Tooltip position="bottom" text="Editar">
            <Button variant="ghost" className="hover:bg-transparent group">
              <Pencil
                size={18}
                color="#797E86"
                className="duration-200 group-hover:stroke-hidro-blue-300"
              />
            </Button>
          </Tooltip>

          <AlertDialog>
            <Tooltip position="bottom" text="Excluir">
              <AlertDialogTrigger>
                <Button variant="ghost" className="hover:bg-transparent group">
                  <Trash2
                    size={18}
                    color="#797E86"
                    className="duration-200 group-hover:stroke-hidro-blue-300"
                  />
                </Button>
              </AlertDialogTrigger>
            </Tooltip>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogDescription className="font-semibold text-center text-base text-gray-scale-300">
                  <span>
                    Você está prestes a excluir o cliente {row.original.name}.
                  </span>
                  <br />
                  <span>Deseja continuar?</span>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="border-t border-gray-scale-800 pt-4">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="!bg-red-auxiliary text-white">
                  Sim, excluir cliente
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full border-b border-gray-scale-800 !min-h-[100px] !h-[100px]">
        Filters will go here
      </div>

      <div className="w-full pb-10 px-10">
        <Dialog>
          <DataTableTitle
            title={'Clientes'}
            addElementButtonLabel="Adicionar cliente"
          />
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
