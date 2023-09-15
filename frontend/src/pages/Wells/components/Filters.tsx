import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';

interface WellsFilter {
  name: string;
}

export default function Filters(): ReactElement {
  // TODO
  function onSubmitFilters(data: WellsFilter): void {
    console.log('data', data);
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<WellsFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex items-center gap-4"
      >
        <Input.Wrapper className="w-[240px]">
          <Input.Label label="Data inicial" />
          <Input.DatePicker id="name" name="initialDate" />
        </Input.Wrapper>

        <p className="text-gray-scale-300 mt-7 text-sm">até</p>

        <Input.Wrapper className="w-[240px]">
          <Input.Label label="Data final" />
          <Input.DatePicker id="name" name="finalDate" />
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
