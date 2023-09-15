import { ColumnDef, Table } from '@tanstack/react-table';

export interface TableProperty<T> {
  table: Table<T>;
}

export interface DataTableTitleProperties {
  title?: string;
  addElementButtonLabel?: string;
  disabledAdd?: boolean;
  disabledMessage?: string;
}

export interface DataTableProperties<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  isLoading?: boolean;
}
