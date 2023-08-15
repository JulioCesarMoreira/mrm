import { Button } from '@components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactElement } from 'react';
import type { TableProperty } from './types';

export default function DataTablePagination<T>({
  table,
}: TableProperty<T>): ReactElement {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()} {table.getPageCount() > 1 && 'páginas'}
      </div>
      <div className="flex">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded-none !rounded-tl-md !rounded-bl-md group hover:!border-hidro-blue-300 duration-200"
        >
          <ChevronLeft
            size={18}
            className="group-hover:stroke-hidro-blue-300 duration-200"
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded-none !rounded-tr-md !rounded-br-md group hover:!border-hidro-blue-300 duration-200"
        >
          <ChevronRight
            size={18}
            className="group-hover:stroke-hidro-blue-300 duration-200"
          />
        </Button>
      </div>
    </div>
  );
}
