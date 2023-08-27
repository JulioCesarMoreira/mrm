import DataTable from '@components/DataTable/DataTable';
import ClientsForm from './components/ClientForm';
import Filters from './components/Filters';
import useFetchClients from './hooks/useFetchClients';
import useClientsColumns from './hooks/useClientsColumns';

export default function ClientsPage() {
  const { data, isLoading } = useFetchClients();
  const columns = useClientsColumns();

  return (
    <div className="flex w-full flex-col">
      <Filters />

      <div className="w-full px-10 pb-10">
        <ClientsForm
          defaultValues={{ contactPhone: '', cpfCnpj: '', name: '' }}
        />

        <DataTable data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  );
}
