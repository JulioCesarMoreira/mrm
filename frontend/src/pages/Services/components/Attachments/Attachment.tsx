import Tooltip from '@components/Tooltip/Tooltip';
import { isFileAnImage } from '@lib/utils';
import { File, Trash } from 'lucide-react';
import useServiceContext from 'pages/Services/context/useServiceContext';
import { ReactElement, useEffect, useState } from 'react';

interface AttachmentProperties {
  name: string;
  url: string;
  fileKey: string;
}

export default function Attachment({
  name,
  url,
  fileKey,
}: AttachmentProperties): ReactElement {
  const [firstRender, setFirstRender] = useState(true);
  const { onRemoveAttachment } = useServiceContext();

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <div className="flex-col-center group col-span-1">
      {name && isFileAnImage(name) ? (
        <Tooltip position="top" text="Abrir em nova aba">
          <button onClick={() => window.open(url, '_blank')?.focus()}>
            <img src={url} alt="anexo" className="h-full rounded-md" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip position="top" text="Abrir em nova aba">
          <button
            onClick={() => window.open(url, '_blank')?.focus()}
            className="flex-center bg-gray-scale-800 min-h-full w-full rounded-md"
          >
            <File size={26} color="#52575F" />
          </button>
        </Tooltip>
      )}
      <div className="mt-1 flex w-full items-center justify-center gap-2">
        <span className="text-gray-scale-200">{name}</span>

        <Tooltip text="Excluir" position="bottom" disabled={firstRender}>
          <button
            type="button"
            onClick={(): void => onRemoveAttachment(fileKey)}
            className="pointer-events-none opacity-0 duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
          >
            <Trash size={18} color="gray" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
