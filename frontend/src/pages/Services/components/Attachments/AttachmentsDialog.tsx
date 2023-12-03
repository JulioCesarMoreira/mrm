import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Info, Loader, Paperclip, Trash } from 'lucide-react';
import { ReactElement, useMemo, useState } from 'react';
import Attachment from './Attachment';
import { Input } from '@components/Input';
import useServiceContext from 'pages/Services/context/useServiceContext';
import Tooltip from '@components/Tooltip/Tooltip';
import Spinner from '@components/ui/spinner';
import { Button } from '@components/ui/button';

export default function AttachmentsDialog(): ReactElement {
  const {
    attachments,
    defaultAttachments,
    isLoadingAttachments,
    onSetAttachments,
    onRemoveAllAttachments,
  } = useServiceContext();
  const [openConfirm, setOpenConfirm] = useState(false);

  const onConfirm = (): void => {
    setOpenConfirm(false);
    onRemoveAllAttachments();
  };

  const onOpenConfirmRemoveAllAttachments = (): void => setOpenConfirm(true);

  const onCancel = (): void => setOpenConfirm(false);

  const attachmentsToShow = useMemo(
    () => [
      ...attachments.map(({ file, key }) => ({
        key,
        name: file.name,
        url: URL.createObjectURL(file),
      })),
      ...defaultAttachments,
    ],
    [attachments, defaultAttachments],
  );

  return (
    <Dialog>
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="text-center">
          Você está prestes a remover todos os anexos. <br /> Prosseguir?
          <hr className="w-full" />
          <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
            <Button
              type="button"
              variant={'secondary'}
              onClick={onCancel}
              className="hover:bg-gray-scale-700 transition-colors duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant={'default'}
              onClick={onConfirm}
              className="bg-red-auxiliary hover:bg-red-auxiliary-dark text-white transition-colors duration-200"
            >
              Remover todos
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
                            <li>Você pode selecionar até 20 arquivos.</li>
                            <li>
                              Formatos aceitos: .png, .jpg, .jpeg, .pdf, .xlsx,
                              .xls, .doc, .docx
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

        {attachmentsToShow.length > 0 && (
          <Tooltip text="Remover todos" arrow position="left">
            <button
              className="ml-auto w-fit"
              onClick={onOpenConfirmRemoveAllAttachments}
            >
              <Trash size={22} color="gray" />
            </button>
          </Tooltip>
        )}
        {isLoadingAttachments ? (
          <div className="flex w-full items-center justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <div className="grid max-h-[480px] grid-flow-row grid-cols-3 gap-20 overflow-y-auto p-4">
            {attachmentsToShow.length > 0 ? (
              attachmentsToShow.map(({ url, name, key }) => (
                <Attachment key={key} fileKey={key} name={name} url={url} />
              ))
            ) : (
              <div className="flex-center col-span-full w-full py-20">
                Nenhum anexo vinculado a este serviço.
              </div>
            )}
          </div>
        )}

        <div className="border-gray-scale-600 w-full border-t border-dotted" />

        <Input.FileDrop
          filesLength={attachmentsToShow.length}
          onSetFiles={onSetAttachments}
        />
      </DialogContent>
    </Dialog>
  );
}
