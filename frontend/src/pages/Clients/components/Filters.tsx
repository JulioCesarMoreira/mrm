import { Input } from '@components/FormFields/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';

interface ClientsFilter {
  name: string;
}

export default function Filters(): ReactElement {
  function onSubmitFilters(data: ClientsFilter): void {
    console.log('data', data);
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<ClientsFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex gap-4"
      >
        <Input.Wrapper className="w-[300px]">
          <Input.Label label="Nome" />
          <Input.Field id="name" name="name" placeholder="Nome" />
        </Input.Wrapper>

        <Input.Wrapper className="w-[300px]">
          <Input.Label label="Contato" />
          <Input.Field
            id="contactName"
            name="contactName"
            placeholder="Busque por contato"
          />
        </Input.Wrapper>

        <Input.Wrapper className="w-[300px]">
          <Input.Label label="Telefone" />
          <Input.Field id="contactPhone" name="contactPhone" maskType="tel" />
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
