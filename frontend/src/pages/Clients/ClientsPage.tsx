import DataTable from '@components/DataTable/DataTable';
import ClientForm from './components/ClientForm';
import Filters from './components/Filters';
import useFetchClients from './hooks/useFetchClients';
import useClientColumns from './hooks/useClientColumns';

export default function ClientsPage() {
  const columns = useClientColumns();
  const { data, isLoading, fetch } = useFetchClients();

  return (
    <div className="flex w-full flex-col">
      <Filters fetch={fetch} />

      <div className="w-full px-10 pb-10">
        <ClientForm
          defaultValues={{
            contactPhone: '',
            cpfCnpj: '',
            name: '',
            contactName: '',
          }}
        />

        <DataTable data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  );
}
