import { ColumnDef } from '@tanstack/react-table';
import { CategoryService, ItemService, Status } from '../types';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import ItemActions from '../components/ItemActions';

export default function useItemColumns(
  categories: CategoryService[] | undefined,
): ColumnDef<ItemService>[] {
  const categoriesMap = categories
    ? new Map<string, CategoryService>(
        categories.map((category) => [category.id, category]),
      )
    : new Map<string, CategoryService>([]);

  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Tooltip
            position="top"
            text={
              column.getIsSorted() === 'asc'
                ? 'Ordenar decrescente'
                : 'Ordenar crescente'
            }
          >
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Nome
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </Tooltip>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'categoryServiceId',
      header: () => <div className="text-center">Categoria</div>,
      cell: ({ row }) => {
        const itemCategory = categoriesMap.get(row.original.categoryServiceId);
        return (
          <div className="w-full">
            <div
              className="mx-auto w-fit rounded-[2px] px-2 py-1"
              style={{ backgroundColor: itemCategory?.color }}
            >
              {itemCategory?.name}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const itemStatus = row.getValue('status') as Status;
        return (
          <div className="w-full">
            <div
              className={twMerge(
                'mx-auto w-fit rounded-[2px] px-2 py-1',
                itemStatus === Status.AVAILABLE
                  ? 'bg-green-auxiliary'
                  : 'bg-orange-auxiliary',
              )}
            >
              {itemStatus === Status.AVAILABLE ? 'Disponível' : 'Indisponível'}
            </div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return <ItemActions row={row} categories={categories ?? []} />;
      },
    },
  ];
}
