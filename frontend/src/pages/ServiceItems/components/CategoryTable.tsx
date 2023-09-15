import { TableComponent as Table } from '@components/ui/table';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useEffect, useState } from 'react';
import Spinner from '@components/ui/spinner';
import { DataTableProperties } from '@components/DataTable/types';
import { CategoryService, SubCategory } from '../types';
import CategoryActions from './CategoryActions';
import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import CategoryForm from './CategoryForm/CategoryForm';

const columns: ColumnDef<CategoryService>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="w-[140%] text-left">Categorias</div>,
    cell: ({ row }) => {
      return (
        <div
          className="flex-center text-gray-scale-200 w-[140%] rounded-[2px] px-2 py-1 text-left"
          style={{
            backgroundColor: row.original.color,
          }}
        >
          {row.getValue('name')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <CategoryActions row={row} />;
    },
  },
];

export default function CategoryDataTable({
  data,
  isLoading,
}: Omit<DataTableProperties<CategoryService>, 'columns'>): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  const onChangeOpenDialog = (open: boolean): void =>
    setOpenAddCategoryDialog(open);

  useEffect(() => {
    table.setPageSize(Number.POSITIVE_INFINITY);
  }, []);

  return (
    <>
      <CategoryForm
        openDialog={openAddCategoryDialog}
        onChangeOpenDialog={onChangeOpenDialog}
        defaultValues={{
          color: '#3A9ED4',
          name: '',
          subCategory: SubCategory.SUPLIE,
        }}
      />

      <div
        className="overflow-hidden rounded-lg border"
        style={{
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 200px)',
          height: 'calc(100vh - 200px)',
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
            maxHeight: 'calc(100vh - 325px)',
            height: 'calc(100vh - 325px)',
          }}
        >
          <Table.Wrapper>
            <Table.Body>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
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
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isLoading ? (
                      <div className="flex-center h-40 w-full">
                        <Spinner />
                      </div>
                    ) : (
                      'Nada encontrado.'
                    )}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Wrapper>
        </div>

        <div className="flex-center mx-auto w-full px-5 pt-6">
          <Button
            type="button"
            variant={'secondary'}
            onClick={(): void => setOpenAddCategoryDialog(true)}
            className="flex-center bg-gray-scale-800 hover:bg-gray-scale-700 w-full -translate-y-3 transition-colors duration-200"
          >
            <Plus size={18} />
            Adicionar
          </Button>
        </div>
      </div>
    </>
  );
}
