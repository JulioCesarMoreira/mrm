import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';
import { format, parse, parseISO } from 'date-fns';

interface WellsFilter {
  startDate: string;
  deliveryDate: string;
}

interface FilterProperties {
  fetch: (filters: WellsFilter) => Promise<void>;
}

export default function Filters({ fetch }: FilterProperties): ReactElement {
  function onSubmitFilters({ deliveryDate, startDate }: WellsFilter): void {
    void fetch({
      deliveryDate: format(
        parse(deliveryDate, 'dd/MM/yyyy', new Date()),
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
      ),
      startDate: format(
        parse(startDate, 'dd/MM/yyyy', new Date()),
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
      ),
    });
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<WellsFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex w-full gap-6"
      >
        <Input.Wrapper className="mb-2 ml-6 w-[240px]">
          <Input.Label label="Data de início" />
          <Input.DatePicker name="startDate" />
        </Input.Wrapper>

        <Input.Wrapper className="mb-2 w-[240px]">
          <Input.Label label="Data de entrega" />
          <Input.DatePicker name="deliveryDate" />
        </Input.Wrapper>

        <div className="flex w-fit flex-row-reverse items-center pt-3">
          <Tooltip position="left" text="Pesquisar">
            <Button
              variant="ghost"
              ref={undefined}
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
