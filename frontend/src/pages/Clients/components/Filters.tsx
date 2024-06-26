import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';
import { removeSpecialCharacters } from '@lib/utils';

interface ClientsFilter {
  name: string;
  contactName: string;
  contactPhone: string | undefined;
}

interface FilterProperties {
  fetch: (filters: ClientsFilter) => Promise<void>;
}

export default function Filters({ fetch }: FilterProperties): ReactElement {
  function onSubmitFilters(data: ClientsFilter): void {
    void fetch({
      ...data,
      contactPhone: data.contactPhone
        ? removeSpecialCharacters(data.contactPhone)
        : undefined,
    });
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<ClientsFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex w-full gap-6"
        defaultValues={{ name: '' }}
      >
        <Input.Wrapper className="mb-2 ml-6 w-[240px]">
          <Input.Label label="Cliente" />
          <Input.Field name="name" placeholder="Nome do cliente" />
        </Input.Wrapper>

        <Input.Wrapper className="mb-2 w-[240px]">
          <Input.Label label="Contato" />
          <Input.Field name="contactName" placeholder="Nome do contato" />
        </Input.Wrapper>

        <Input.Wrapper className="mb-2 w-[240px]">
          <Input.Label label="Telefone" />
          <Input.Field name="contactPhone" maskType="tel" />
        </Input.Wrapper>

        <div className="flex w-fit flex-row-reverse items-center pt-3">
          <Tooltip position="left" text="Pesquisar">
            <Button
              ref={undefined}
              type="submit"
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
