import Tooltip from '@components/Tooltip/Tooltip';
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
import { Button } from '@components/ui/button';
import { Row } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';
import { ReactElement } from 'react';
import { Client } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import ClientsForm from './ClientsForm';

interface RowActionsProperties {
  row: Row<Client>;
}

export default function RowActions({
  row,
}: RowActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      <Dialog>
        <Tooltip position="bottom" text="Editar">
          <DialogTrigger>
            <Button variant="ghost" className="group hover:bg-transparent">
              <Pencil
                size={18}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            </Button>
          </DialogTrigger>
        </Tooltip>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Editar cliente</DialogTitle>
            <hr className="w-full" />
            <ClientsForm defaultValues={row.original} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <Tooltip position="bottom" text="Excluir">
          <AlertDialogTrigger>
            <Button variant="ghost" className="group hover:bg-transparent">
              <Trash2
                size={18}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            </Button>
          </AlertDialogTrigger>
        </Tooltip>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-gray-scale-300 text-center text-base font-semibold">
              <span>
                Você está prestes a excluir o cliente {row.original.name}.
              </span>
              <br />
              <span>Deseja continuar?</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-gray-scale-800 border-t pt-4">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="!bg-red-auxiliary text-white">
              Sim, excluir cliente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
