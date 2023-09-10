import FormWrapper from '@components/FormWrapper/FormWrapper';
import { ReactElement, useState } from 'react';
import { ClientFields } from '../types';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { useSetAtom } from 'jotai';
import { toggleFetchClients } from 'constants/atoms';
import useUpdateClient from '../hooks/useUpdateClient';
import Spinner from '@components/ui/spinner';
import useInsertClient from '../hooks/useInsertClient';
import Tooltip from '@components/Tooltip/Tooltip';
import { Pencil } from 'lucide-react';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { CLOSE_DIALOG_DURATION } from 'constants';
import ClientFormFields from './ClientFormFields';
import { removeSpecialCharacters } from '../utils';

interface ClientsFormProperties {
  defaultValues: ClientFields;
}

export default function ClientForm({
  defaultValues,
}: ClientsFormProperties): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const setToggleFetchClients = useSetAtom(toggleFetchClients);

  const { updateClient } = useUpdateClient();
  const { insertClient } = useInsertClient();

  async function onSubmitClient(client: ClientFields): Promise<void> {
    setIsLoading(true);

    const input: ClientFields = {
      ...client,
      cpfCnpj: removeSpecialCharacters(client.cpfCnpj),
      contactPhone: removeSpecialCharacters(client.contactPhone),
    };

    console.log('input', input);

    try {
      if (defaultValues.id) {
        await updateClient(defaultValues.id, {
          name: input.name,
          contactPhone: input.contactPhone,
          contactName: input.contactName,
        });
      } else {
        await insertClient(input);
      }
    } finally {
      setOpenDialog(false);
      setToggleFetchClients((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {defaultValues.id ? (
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
      ) : (
        <DataTableTitle
          title={'Clientes'}
          addElementButtonLabel="Adicionar cliente"
        />
      )}

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {defaultValues.id ? 'Editar cliente' : 'Adicionar cliente'}
          </DialogTitle>
          <FormWrapper<ClientFields>
            id="client-form"
            onSubmit={onSubmitClient}
            className="py-4"
            defaultValues={defaultValues}
          >
            {isLoading ? (
              <div className="flex-center h-40 w-full">
                <Spinner />
              </div>
            ) : (
              <>
                <ClientFormFields defaultValues={defaultValues} />

                <hr className="w-full" />

                <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
                  <Button
                    type="submit"
                    variant={'default'}
                    className="bg-hidro-blue-300 hover:bg-main-blue text-white"
                  >
                    Salvar
                  </Button>
                  <DialogTrigger>
                    <Button
                      variant={'secondary'}
                      className="hover:bg-gray-scale-700 transition-colors duration-200"
                    >
                      Cancelar
                    </Button>
                  </DialogTrigger>
                </div>
              </>
            )}
          </FormWrapper>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
