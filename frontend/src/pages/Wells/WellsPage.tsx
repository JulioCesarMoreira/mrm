import { ReactElement } from 'react';
import useWellColumns from './hooks/useWellColumns';
import useFetchWells from './hooks/useFetchWells';
import Filters from './components/Filters';
import DataTable from '@components/DataTable/DataTable';
import WellForm from './components/WellForm';

export default function WellsPage(): ReactElement {
  const columns = useWellColumns();
  const { data, isLoading } = useFetchWells();

  return (
    <div className="flex w-full flex-col">
      <Filters />

      <div className="w-full px-10 pb-10">
        <WellForm
          defaultValues={{
            cep: '',
            cityId: '',
            clientName: '',
            deliveryDate: '',
            distric: '',
            dynamicLevel: '',
            id: '',
            latitude: '',
            longitude: '',
            mapLink: '',
            number: '',
            proposalServiceId: '',
            sedimentaryDepth: '',
            sieveDepth: '',
            staticLevel: '',
            street: '',
            totalDepth: '',
            voltage: '',
          }}
        />

        <DataTable data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  );
}
