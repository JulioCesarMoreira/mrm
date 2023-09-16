import { ReactElement } from 'react';
import useWellColumns from './hooks/useWellColumns';
import useFetchWells from './hooks/useFetchWells';
import Filters from './components/Filters';
import DataTable from '@components/DataTable/DataTable';
import DataTableTitle from '@components/DataTable/DataTableTitle';

export default function WellsPage(): ReactElement {
  const columns = useWellColumns();
  const { data, isLoading } = useFetchWells();

  return (
    <div className="flex w-full flex-col">
      <Filters />

      <div className="w-full px-10 pb-10">
        <DataTableTitle title="Poços" />
        <DataTable data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  );
}
