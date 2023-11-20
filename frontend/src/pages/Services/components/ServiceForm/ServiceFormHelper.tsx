import Tooltip from '@components/Tooltip/Tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@components/ui/dialog';
import { Info } from 'lucide-react';
import { ReactElement } from 'react';

export default function ServiceFormHelper(): ReactElement {
  return (
    <div className="ml-auto mr-4 flex h-full items-center pt-4">
      <Tooltip position="left" text="Ajuda">
        <div ref={undefined}>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="group">
                <Info
                  size={22}
                  className="stroke-gray-scale-400 group-hover:stroke-dark-blue duration-200"
                />
              </button>
            </DialogTrigger>

            <DialogContent className="min-w-fit">
              <DialogHeader>Ajuda: Cadastro/Edição de serviço</DialogHeader>
              <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
                <ul className="list-disc space-y-4">
                  <li>
                    Preencha sua proposta de serviço com as informações do poço
                    e os itens de serviço que serão utilizados para realiza-lá.
                    Para escolher itens, basta primeiro selecionar a respectiva
                    categoria desejada.
                  </li>
                  <li>
                    Há também o espaço para anexos na parte inferior esquerda,
                    onde será possível visualizar, remover ou adicionar conforme
                    a necessidade.
                  </li>

                  <li className="mt-4 font-semibold">
                    <hr className="bg-gray-scale-600 mb-4 w-full" />
                    Atenção: para salvar um serviço, é necessário preencher os
                    campos sobre o Poço, assim como selecionar um Cliente e
                    informar Desconto e a Garantia.
                  </li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Tooltip>
    </div>
  );
}
