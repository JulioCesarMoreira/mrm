import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';
import { CategoryService, ItemFilter, Status } from '../types';

interface ItemsFilterFields {
  name: string;
  status: Status;
  categoryServiceId: string;
}

interface FilterProperties {
  categories: CategoryService[] | undefined;
  fetch: (filters: ItemFilter) => Promise<void>;
}

export default function Filters({
  fetch,
  categories,
}: FilterProperties): ReactElement {
  function onSubmitFilters(data: ItemsFilterFields): void {
    void fetch({
      ...data,
      categoryServiceId: data.categoryServiceId
        ? Number.parseInt(data.categoryServiceId, 10)
        : undefined,
    });
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<ItemsFilterFields>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex gap-6"
      >
        <Input.Wrapper className="mb-2 ml-6 w-[240px]">
          <Input.Label label="Nome" />
          <Input.Field name="name" placeholder="Nome" />
        </Input.Wrapper>

        <Input.Wrapper className="mb-2 w-[240px]">
          <Input.Label label="Categoria" />
          <Input.Select
            name="categoryServiceId"
            disabled={!categories || categories.length === 0}
            options={
              categories
                ? [
                    { name: 'Todas', value: '' },
                    ...categories.map(({ id, name }) => ({
                      name,
                      value: String(id),
                    })),
                  ]
                : []
            }
          />
        </Input.Wrapper>

        <Input.Wrapper className="mb-2 w-[240px]">
          <Input.Label label="Status" />
          <Input.Select
            name="status"
            options={[
              { name: 'Todos', value: '' },
              { name: 'Disponível', value: Status.AVAILABLE },
              { name: 'Indisponível', value: Status.UNAVAILABLE },
            ]}
          />
        </Input.Wrapper>

        <div className="flex w-fit flex-row-reverse items-center pt-3">
          <Tooltip position="left" text="Pesquisar">
            <Button
              variant="ghost"
              className="bg-gray-scale-800 hover:bg-gray-scale-700 h-[48px]"
            >
              <Search className="stroke-dark-blue h-5 w-5" />
            </Button>
          </Tooltip>
        </div>
      </FormWrapper>
    </div>
  );
}
