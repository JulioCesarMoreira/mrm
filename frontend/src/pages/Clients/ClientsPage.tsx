import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Client } from './types';
import { useState } from 'react';

const data: Client[] = [
  {
    id: 'm5gr84i9',
    name: 'Henrique Luhm 1',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '3u1reuv4',
    name: 'Henrique Luhm 2',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: 'derv1ws0',
    name: 'Henrique Luhm 3',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: '5kma53ae',
    name: 'Henrique Luhm 4',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
  {
    id: 'bhqecj4p',
    name: 'Henrique Luhm 5',
    contactPhone: '42988884444',
    cpfCnpj: '0123456789',
  },
];

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'cpfCnpj',
    header: () => <div className="text-center">CPF / CNPJ</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue('cpfCnpj')}</div>;
    },
  },
  {
    accessorKey: 'contactPhone',
    header: () => <div className="text-center">Telefone</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue('contactPhone')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex-center">
          <Button variant="ghost" className="hover:bg-transparent group">
            <Pencil
              size={18}
              color="#797E86"
              className="duration-200 group-hover:stroke-hidro-blue-300"
            />
          </Button>
          <Button variant="ghost" className="hover:bg-transparent group">
            <Trash2
              size={18}
              color="#797E86"
              className="duration-200 group-hover:stroke-hidro-blue-300"
            />
          </Button>
        </div>
      );
    },
  },
];

export default function ClientsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full m-10">
      <div className="flex items-center justify-between py-4">
        <p className="text-gray-scale-400 font-semibold text-xl">Clientes</p>
        <Button>Adicionar cliente</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()} {table.getPageCount() > 1 && 'páginas'}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
