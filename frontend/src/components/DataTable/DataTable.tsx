import { TableComponent as Table } from '@components/ui/table';
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useState } from 'react';
import { DataTableProperties } from './types';
import DataTablePagination from './DataTablePagination';
import Spinner from '@components/ui/spinner';

export default function DataTable<T>({
  data,
  columns,
  isLoading,
}: DataTableProperties<T>): ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <div className="rounded-lg border">
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

          <Table.Body>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
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

      <DataTablePagination table={table} />
    </>
  );
}
