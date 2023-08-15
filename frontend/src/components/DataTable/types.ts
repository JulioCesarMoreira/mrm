import { ColumnDef, Table } from '@tanstack/react-table';

export interface TableProperty<T> {
  table: Table<T>;
}

export interface DataTableTitleProperties {
  title: string;
  addElementButtonLabel?: string;
}

export interface DataTableProperties<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
}
