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
import { Info, Pencil } from 'lucide-react';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { CLOSE_DIALOG_DURATION } from 'constants';
import ClientFormFields from './ClientFormFields';
import { removeSpecialCharacters } from '@lib/utils';

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

    try {
      if (defaultValues.id) {
        const result = await updateClient(defaultValues.id, {
          name: input.name,
          contactPhone: input.contactPhone,
          contactName: input.contactName,
        });
        if (result) setOpenDialog(false);
      } else {
        const result = await insertClient(input);
        if (result) setOpenDialog(false);
      }
    } finally {
      setToggleFetchClients((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {defaultValues.id ? (
        <Tooltip position="bottom" text="Editar">
          <DialogTrigger asChild ref={undefined}>
            <Button
              ref={undefined}
              variant="ghost"
              className="group hover:bg-transparent"
            >
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
          helpContent={
            <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
              <ul className="list-disc space-y-4">
                <li>
                  Aqui é onde você tem acesso aos registros de seus clientes,
                  eles serão listados aqui automaticamente.
                </li>
                <li>
                  Opcionalmente, você pode utilizar os filtros no topo da
                  página.
                </li>

                <li className="mt-4 font-semibold">
                  <hr className="bg-gray-scale-600 mb-4 w-full" />
                  Atenção: é necessário ter no mínimo um cliente para poder
                  cadastrar propostas de serviço.
                </li>
              </ul>
            </div>
          }
        />
      )}

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span>
                  {defaultValues.id ? 'Editar cliente' : 'Adicionar cliente'}
                </span>
                <Tooltip position="right" text="Ajuda">
                  <div ref={undefined}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="group mt-1">
                          <Info
                            size={18}
                            className="stroke-gray-scale-400 group-hover:stroke-dark-blue duration-200"
                          />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="min-w-fit">
                        <DialogHeader>
                          Ajuda de formulário: Cliente
                        </DialogHeader>
                        <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
                          <ul className="list-disc space-y-4">
                            <li>
                              Esse é o formulário para cadastrar/editar um
                              cliente.
                            </li>
                            <li>
                              Você deve preenchê-lo com:
                              <ul className="ml-6 mt-2 list-disc">
                                <li>
                                  Nome do cliente (nome da empresa ou da pessoa
                                  física).
                                </li>
                                <li>
                                  Nome do contato (pode ser o próprio nome do
                                  cliente ou outra pessoa que será o principal
                                  contato).
                                </li>
                                <li>Celular ou telefone para contato.</li>
                                <li>
                                  Documento do cliente, sendo esse CPF ou CNPJ.
                                </li>
                              </ul>
                            </li>

                            <li className="mt-4 font-semibold">
                              <hr className="bg-gray-scale-600 mb-4 w-full" />
                              Atenção: o campo de CPF ou CNPJ deve conter um
                              documento válido.
                            </li>
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Tooltip>
              </div>
              <span className="text-gray-scale-600 text-xs">
                campos com * são obrigatórios
              </span>
            </div>
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
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant={'secondary'}
                      className="hover:bg-gray-scale-700 transition-colors duration-200"
                    >
                      Cancelar
                    </Button>
                  </DialogTrigger>
                  <Button
                    type="submit"
                    variant={'default'}
                    className="bg-hidro-blue-300 hover:bg-main-blue text-white"
                  >
                    Salvar
                  </Button>
                </div>
              </>
            )}
          </FormWrapper>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
