import useFetchCategories from './hooks/useFetchCategories';
import Filters from './components/Filters';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import CategoryDataTable from './components/CategoryTable';
import DataTable from '@components/DataTable/DataTable';
import useFetchItems from './hooks/useFetchItems';
import useItemColumns from './hooks/useItemColumns';
import ItemForm from './components/ItemForm/ItemForm';
import { Status } from './types';

export default function ServiceItemsPage() {
  const { data: items, isLoading: isLoadingItems, fetch } = useFetchItems();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategories();

  const itemColumns = useItemColumns(categories);

  return (
    <div className="flex h-screen max-h-[100vh] w-full flex-col overflow-hidden">
      <Filters categories={categories} fetch={fetch} />

      <div className="flex w-full gap-7 px-10 pb-10">
        <div className="w-4/12 overflow-hidden 2xl:w-3/12">
          <div className="py-1.5">
            <DataTableTitle
              title={'Itens de serviço'}
              helpContent={
                <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
                  <ul className="list-disc space-y-4">
                    <li>
                      Aqui é onde você tem acesso aos registros de seus itens de
                      serviço e suas respectivas categorias, eles serão listados
                      aqui automaticamente.
                    </li>
                    <li>
                      Opcionalmente, você pode utilizar os filtros no topo da
                      página.
                    </li>

                    <li className="mt-4 font-semibold">
                      <hr className="bg-gray-scale-600 mb-4 w-full" />
                      Atenção: é necessário ter no mínimo uma categoria para
                      poder cadastrar itens de serviço.
                    </li>
                  </ul>
                </div>
              }
            />
          </div>

          <CategoryDataTable
            data={categories}
            isLoading={isLoadingCategories}
          />
        </div>
        <div className="w-8/12 2xl:w-9/12">
          <ItemForm
            defaultValues={{
              categoryServiceId: '',
              description: '',
              name: '',
              status: Status.AVAILABLE,
              unit: '',
            }}
            categories={categories}
          />

          <DataTable
            data={items}
            columns={itemColumns}
            isLoading={isLoadingItems || isLoadingCategories}
          />
        </div>
      </div>
    </div>
  );
}
