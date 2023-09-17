import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Paperclip } from 'lucide-react';

import { ReactElement } from 'react';
import Attachment from './Attachment';
import { Input } from '@components/Input';
import useServiceContext from 'pages/Services/context/useServiceContext';

export default function AttachmentsDialog(): ReactElement {
  const { attachments, onSetAttachments } = useServiceContext();

  console.log('attachments', attachments);

  return (
    <Dialog>
      <DialogTrigger className="flex-center bg-dark-blue w-28 gap-2 rounded-full px-4 py-2 text-white">
        <Paperclip size={18} color="white" />
        <span className="text-sm">Anexos</span>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Anexos</DialogTitle>
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
