import { ReactElement, useState } from 'react';
import Spinner from '@components/ui/spinner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Trash2 } from 'lucide-react';
import { ClientProperty } from '../types';
import useDeleteClient from '../hooks/useDeleteClient';
import { useSetAtom } from 'jotai';
import { toggleFetchClients } from 'constants/atoms';
import { CLOSE_DIALOG_DURATION } from 'constants';

export default function ClientDelete({ client }: ClientProperty): ReactElement {
  const { deleteClient } = useDeleteClient();
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const setToggleFetchClients = useSetAtom(toggleFetchClients);

  async function onDelete(): Promise<void> {
    setIsLoading(true);

    try {
      await deleteClient(client.original.id);
    } finally {
      setOpenAlert(false);
      setToggleFetchClients((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
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
        {isLoading ? (
          <div className="flex-center h-40 w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogDescription className="text-gray-scale-300 text-center text-base font-semibold">
                <span>
                  Você está prestes a excluir o cliente {client.original.name}.
                </span>
                <br />
                <span>Deseja continuar?</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="border-gray-scale-800 border-t pt-4">
              <AlertDialogCancel className="hover:bg-gray-scale-700 border-0 transition-colors duration-200">
                Cancelar
              </AlertDialogCancel>
              <Button
                onClick={onDelete}
                className="bg-red-auxiliary hover:bg-red-auxiliary-dark text-white transition-colors duration-200"
              >
                Sim, excluir cliente
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
