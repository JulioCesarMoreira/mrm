import { ReactElement } from 'react';
import useWellColumns from './hooks/useWellColumns';
import useFetchWells from './hooks/useFetchWells';
import Filters from './components/Filters';
import DataTable from '@components/DataTable/DataTable';
import DataTableTitle from '@components/DataTable/DataTableTitle';

export default function WellsPage(): ReactElement {
  const columns = useWellColumns();
  const { data, isLoading, fetch } = useFetchWells();

  return (
    <div className="flex w-full flex-col">
      <Filters fetch={fetch} />

      <div className="w-full px-10 pb-10">
        <DataTableTitle
          title="Poços"
          helpContent={
            <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
              <ul className="list-disc space-y-4">
                <li>
                  Aqui é onde você tem acesso aos registros dos poços de suas
                  propostas de serviço, eles serão listados aqui
                  automaticamente.
                </li>
                <li>
                  Opcionalmente, você pode utilizar os filtros no topo da
                  página.
                </li>

                <li className="mt-4 font-semibold">
                  <hr className="bg-gray-scale-600 mb-4 w-full" />
                  Atenção: poços são cadastrados a partir das propostas de
                  serviço.
                </li>
              </ul>
            </div>
          }
        />
        <DataTable
          data={data}
          rows={6}
          columns={columns}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
