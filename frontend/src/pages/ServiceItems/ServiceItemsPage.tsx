import useFetchCategories from './hooks/useFetchCategories';
import Filters from './components/Filters';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import CategoryDataTable from './components/CategoryTable';
import DataTable from '@components/DataTable/DataTable';

export default function ServiceItemsPage() {
  // const itemColumns = useItemColumns();

  // const { data: items, isLoading: isLoadingItems } = useFetchItems();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchCategories();

  return (
    <div className="flex h-screen max-h-[100vh] w-full flex-col overflow-hidden">
      <Filters categories={categories} />

      <div className="flex w-full gap-7 px-10 pb-10">
        <div className="w-4/12 overflow-hidden">
          <DataTableTitle title={'Itens de serviço'} />

          <CategoryDataTable
            data={categories}
            isLoading={isLoadingCategories}
          />
        </div>
        <div className="w-8/12">
          {/* <DataTable
            data={categories}
            columns={categoryColumns}
            isLoading={isLoadingCategories}
          /> */}
          {/* <DataTable data={items} columns={itemColumns} isLoading={isLoadingItems} /> */}
        </div>
      </div>
    </div>
  );
}
