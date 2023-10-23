import { Info, Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import type { ReactElement } from 'react';
import type { DataTableTitleProperties } from './types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@components/ui/dialog';
import { twMerge } from 'tailwind-merge';
import Tooltip from '@components/Tooltip/Tooltip';

export default function DataTableTitle({
  title,
  addElementButtonLabel,
  disabledAdd,
  disabledMessage,
  helpContent,
}: DataTableTitleProperties): ReactElement {
  return (
    <div className="flex items-center justify-between py-4">
      {title && (
        <div className="flex items-center gap-4">
          <p className="text-gray-scale-400 text-xl font-semibold">{title}</p>

          <Tooltip position="right" text="Ajuda">
            <div ref={undefined}>
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="group mt-2">
                    <Info
                      size={18}
                      className="stroke-gray-scale-400 group-hover:stroke-dark-blue duration-200"
                    />
                  </button>
                </DialogTrigger>

                <DialogContent className="min-w-fit">
                  <DialogHeader>Ajuda: {title}</DialogHeader>
                  {helpContent}
                </DialogContent>
              </Dialog>
            </div>
          </Tooltip>
        </div>
      )}
      {addElementButtonLabel &&
        (disabledAdd ? (
          <Tooltip text={disabledMessage as string} position="bottom">
            <Button
              ref={undefined}
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
