import { Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import type { ReactElement } from 'react';
import type { DataTableTitleProperties } from './types';
import { DialogTrigger } from '@components/ui/dialog';
import { twMerge } from 'tailwind-merge';
import Tooltip from '@components/Tooltip/Tooltip';

export default function DataTableTitle({
  title,
  addElementButtonLabel,
  disabledAdd,
  disabledMessage,
}: DataTableTitleProperties): ReactElement {
  return (
    <div className="flex items-center justify-between py-4">
      {title && (
        <p className="text-gray-scale-400 text-xl font-semibold">{title}</p>
      )}

      {addElementButtonLabel &&
        (disabledAdd ? (
          <Tooltip text={disabledMessage as string} position="bottom">
            <Button
              className={twMerge(
                '!bg-gray-scale-800 text-gray-scale-500 flex !cursor-not-allowed select-none gap-4 rounded-md',
                !title ? 'ml-auto' : '',
              )}
            >
              <Plus size={18} /> {addElementButtonLabel}
            </Button>
          </Tooltip>
        ) : (
          <DialogTrigger asChild>
            <Button
              className={twMerge(
                'bg-hidro-blue-300 hover:bg-main-blue flex gap-4 rounded-md text-white',
                !title ? 'ml-auto' : '',
              )}
            >
              <Plus size={18} /> {addElementButtonLabel}
            </Button>
          </DialogTrigger>
        ))}
    </div>
  );
}
