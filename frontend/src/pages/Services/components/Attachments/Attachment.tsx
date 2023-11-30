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
        <img src={url} alt="anexo" className="h-full" />
      ) : (
        <div className="flex-center h-full">
          <File size={26} color="#52575F" />
        </div>
      )}
      <div className="flex w-full items-center justify-center gap-2">
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
