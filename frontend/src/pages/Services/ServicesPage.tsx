import useFetchClients from 'pages/Clients/hooks/useFetchClients';
import { ReactElement } from 'react';
import useFetchServices from './hooks/useFetchServices';
import Filters from './components/Filters';
import useServiceColumns from './hooks/useServiceColumns';
import DataTable from '@components/DataTable/DataTable';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage(): ReactElement {
  const { data: clients, isLoading: isLoadingClients } = useFetchClients();
  const {
    data: services,
    isLoading: isLoadingServices,
    fetch,
  } = useFetchServices();

  const columns = useServiceColumns(clients);

  return (
    <div className="flex w-full flex-col">
      <Filters clients={clients} fetch={fetch} />

      <div className="w-full px-10 pb-10">
        <div className="flex w-full items-center justify-between">
          <DataTableTitle title="Propostas de serviço" />
          <Link to="/servicos/novo">
            <Button
              type="button"
              className="bg-hidro-blue-300 hover:bg-main-blue flex gap-4 rounded-md text-white"
            >
              <Plus size={18} /> Adicionar proposta
            </Button>
          </Link>
        </div>

        <DataTable
          data={services}
          columns={columns}
          isLoading={isLoadingClients || isLoadingServices}
        />
      </div>
    </div>
  );
}
