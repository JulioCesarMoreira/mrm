import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';
import { CategoryService, Status } from '../types';

interface ItemsFilter {
  name: string;
  status: Status;
  categoryServiceId: string;
}

interface FilterProperties {
  categories: CategoryService[] | undefined;
}

export default function Filters({
  categories,
}: FilterProperties): ReactElement {
  // TODO
  function onSubmitFilters(data: ItemsFilter): void {
    console.log('data', data);
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<ItemsFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex gap-4"
      >
        <Input.Wrapper className="mb-2 w-[240px]">
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
                ? categories.map(({ id, name }) => ({
                    name,
                    value: String(id),
                  }))
                : []
            }
          />
        </Input.Wrapper>

        <Input.Wrapper className="mb-2 w-[240px]">
          <Input.Label label="Status" />
          <Input.Select
            name="status"
            options={[
              { name: 'Disponível', value: Status.AVAILABLE },
              { name: 'Indisponível', value: Status.UNAVAILABLE },
            ]}
          />
        </Input.Wrapper>
      </FormWrapper>

      <div className="flex w-full flex-row-reverse items-center pt-3">
        <Tooltip position="left" text="Pesquisar">
          <Button
            variant="ghost"
            className="bg-gray-scale-800 hover:bg-gray-scale-700"
          >
            <Search className="stroke-dark-blue h-5 w-5" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
