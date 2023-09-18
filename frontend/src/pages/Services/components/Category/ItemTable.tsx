import { TableComponent as Table } from '@components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import { DataTableProperties } from '@components/DataTable/types';
import { Button } from '@components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { CategoryItem, SelectedCategory } from 'pages/Services/types';
import SelectOptionDialog from '../SelectOptionDialog';
import { Option } from 'types';
import { ItemService } from 'pages/ServiceItems/types';
import Tooltip from '@components/Tooltip/Tooltip';
import { twMerge } from 'tailwind-merge';
import useServiceContext from 'pages/Services/context/useServiceContext';

const getColumns = (
  onRemoveRow: (rowId: string) => void,
): ColumnDef<CategoryItem>[] => [
  {
    accessorKey: 'name',
    header: () => <div className="text-left">Nome</div>,
    cell: ({ row }) => {
      return (
        <div className="text-gray-scale-200 rounded-[2px] px-2 py-1 text-left">
          {row.getValue('name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'unity',
    header: () => <div className="text-center">Unidade</div>,
    cell: ({ row }) => {
      return (
        <div className="text-gray-scale-200 ml-[64px] rounded-[2px] px-2 py-1 text-left">
          {row.getValue('unity')}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-left">Quantidade</div>,
    cell: ({ row }) => {
      return (
        <div className="text-gray-scale-200 ml-12 rounded-[2px] px-2 py-1 text-center">
          {row.getValue('quantity')}
        </div>
      );
    },
  },
  {
    accessorKey: 'unitPrice',
    header: () => <div className="text-left">Preço unitário</div>,
    cell: ({ row }) => {
      return (
        <div className="text-gray-scale-200 ml-16 rounded-[2px] px-2 py-1 text-right">
          {row.getValue('unitPrice')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div> </div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Tooltip text="Remover item" position="left">
            <Button
              type="button"
              variant="ghost"
              onClick={(): void => onRemoveRow(row.original.key)}
              className="group hover:bg-transparent"
            >
              <Trash2
                size={18}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            </Button>
          </Tooltip>
        </div>
      );
    },
  },
];

export default function ItemTable({
  data,
  categoryItems,
  selectedCategory,
}: Omit<DataTableProperties<CategoryItem>, 'columns'> & {
  categoryItems: ItemService[] | undefined;
  selectedCategory: SelectedCategory;
}): ReactElement {
  const [openItems, setOpenItems] = useState(false);
  const [tableData, setTableData] = useState<CategoryItem[]>(data);
  const { setSelectedCategories } = useServiceContext();

  const onToggleOpen = (open: boolean) => setOpenItems(open);

  const onRemoveRow = (rowId: string): void =>
    setTableData((previous) => previous.filter((row) => row.key !== rowId));

  function onSelectOption(option: Option): void {
    setOpenItems(false);
    setTableData((previous) => [
      ...previous,
      {
        key: option.value,
        name: option.name,
        quantity: '1',
        unitPrice: '100',
        unity: 'UN',
      },
    ]);
    setSelectedCategories((previous) =>
      previous.map((previouslySelected) => ({
        ...previouslySelected,
        items:
          previouslySelected.id === selectedCategory.id
            ? [
                ...previouslySelected.items,
                {
                  key: option.value,
                  name: option.name,
                  quantity: '1',
                  unitPrice: '100',
                  unity: 'UN',
                },
              ]
            : previouslySelected.items,
      })),
    );
  }

  const table = useReactTable({
    data: tableData,
    columns: getColumns(onRemoveRow),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    table.setPageSize(Number.POSITIVE_INFINITY);
  }, []);

  return (
    <>
      <SelectOptionDialog
        label="Items"
        placeholder="Selecione um item desta categoria"
        options={
          categoryItems
            ? categoryItems
                .filter(
                  (item) =>
                    !tableData.some(
                      (selectedItem) => selectedItem.key === item.id,
                    ),
                )
                .map((item) => ({
                  name: item.name,
                  value: item.id,
                }))
            : []
        }
        onSelectOption={onSelectOption}
        onToggleOpen={onToggleOpen}
        open={openItems}
      />
      <div
        className="overflow-hidden rounded-lg"
        style={{
          overflow: 'hidden',
          maxHeight: '400px',
        }}
      >
        <Table.Wrapper>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} className="!bg-gray-scale-900">
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Head key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Table.Head>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
        </Table.Wrapper>

        <div
          className="w-full overflow-auto"
          style={{
            maxHeight: '400px',
          }}
        >
          <Table.Wrapper>
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Wrapper>
        </div>

        <div className="flex-center mx-auto w-full px-5 pt-6">
          <Tooltip
            text="Todos os itens desta categoria já estão sendo usados."
            position="top"
            disabled={categoryItems && tableData.length < categoryItems?.length}
          >
            <Button
              type="button"
              variant={'secondary'}
              onClick={
                categoryItems?.length === tableData.length
                  ? undefined
                  : (): void => setOpenItems(true)
              }
              className={twMerge(
                'flex-center bg-gray-scale-800 hover:bg-gray-scale-700 w-full -translate-y-3 gap-4 transition-colors duration-200',
                categoryItems?.length === tableData.length
                  ? '!bg-gray-scale-700 text-gray-scale-400 cursor-not-allowed'
                  : '',
              )}
            >
              <Plus size={18} />
              Adicionar
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
