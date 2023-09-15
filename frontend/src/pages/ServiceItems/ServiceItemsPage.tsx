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
  const { data: items, isLoading: isLoadingItems } = useFetchItems();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategories();

  const itemColumns = useItemColumns(categories);

  return (
    <div className="flex h-screen max-h-[100vh] w-full flex-col overflow-hidden">
      <Filters categories={categories} />

      <div className="flex w-full gap-7 px-10 pb-10">
        <div className="w-4/12 overflow-hidden 2xl:w-3/12">
          <div className="py-1.5">
            <DataTableTitle title={'Itens de serviço'} />
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
