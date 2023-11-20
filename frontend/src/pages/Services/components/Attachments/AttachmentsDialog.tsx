import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Info, Paperclip } from 'lucide-react';
import { ReactElement } from 'react';
import Attachment from './Attachment';
import { Input } from '@components/Input';
import useServiceContext from 'pages/Services/context/useServiceContext';
import Tooltip from '@components/Tooltip/Tooltip';

export default function AttachmentsDialog(): ReactElement {
  const { attachments, onSetAttachments } = useServiceContext();

  return (
    <Dialog>
      <DialogTrigger className="flex-center bg-dark-blue w-28 gap-2 rounded-full px-4 py-2 text-white">
        <Paperclip size={18} color="white" />
        <span className="text-sm">Anexos</span>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span>Anexos</span>
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
                        <DialogHeader>Ajuda: Anexos de um serviço</DialogHeader>
                        <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
                          <ul className="list-disc space-y-4">
                            <li>
                              Aqui você poderá salvar anexos relevantes
                              relacionados ao serviço selecionado.
                            </li>
                            <li>
                              Você pode clicar no ícone para abrir o navegador
                              de arquivos de seu sistema ou arrastar documentos
                              diretamente para a área indicada.
                            </li>
                            <li>
                              Seus anexos selecionados serão salvos assim que
                              clicar no botão de "Salvar" da tela do serviço.
                            </li>
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Tooltip>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <hr className="w-full" />

        <div className="grid grid-flow-row grid-cols-3 gap-4">
          {attachments.length > 0 ? (
            attachments.map(({ name, url }) => (
              <Attachment key={url} name={name} url={url} />
            ))
          ) : (
            <div className="flex-center col-span-full w-full py-20">
              Nenhum anexo vinculado a este serviço.
            </div>
          )}
        </div>

        <div className="border-gray-scale-600 w-full border-t border-dotted" />

        <Input.FileDrop files={attachments} onSetFiles={onSetAttachments} />
      </DialogContent>
    </Dialog>
  );
}
