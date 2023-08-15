import { Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import type { ReactElement } from 'react';
import type { DataTableTitleProperties } from './types';
import { DialogTrigger } from '@components/ui/dialog';

export default function DataTableTitle({
  title,
  addElementButtonLabel,
}: DataTableTitleProperties): ReactElement {
  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-gray-scale-400 font-semibold text-xl">{title}</p>

      {addElementButtonLabel && (
        <DialogTrigger>
          <Button className="rounded-md bg-hidro-blue-300 text-white hover:bg-main-blue flex gap-4">
            <Plus size={18} /> {addElementButtonLabel}
          </Button>
        </DialogTrigger>
      )}
    </div>
  );
}
