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
      <p className="text-gray-scale-400 text-xl font-semibold">{title}</p>

      {addElementButtonLabel && (
        <DialogTrigger>
          <Button className="bg-hidro-blue-300 hover:bg-main-blue flex gap-4 rounded-md text-white">
            <Plus size={18} /> {addElementButtonLabel}
          </Button>
        </DialogTrigger>
      )}
    </div>
  );
}
