import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';
import { format, isValid, parse } from 'date-fns';
import { useToast } from '@components/ui/use-toast';

interface WellsFilter {
  deliveryDate: string;
}

interface FilterProperties {
  fetch: (filters: WellsFilter) => Promise<void>;
}

export default function Filters({ fetch }: FilterProperties): ReactElement {
  const { toast } = useToast();

  function onSubmitFilters({ deliveryDate }: WellsFilter): void {
    if (!deliveryDate) {
      fetch({} as WellsFilter);
      return;
    }

    const parsedDate = parse(deliveryDate, 'dd/MM/yyyy', new Date());

    if (!isValid(parsedDate)) {
      toast({
        title: 'Data inválida.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });
      return;
    }

    const dateFormatted = format(parsedDate, 'yyyy-MM-dd');

    void fetch({
      deliveryDate: dateFormatted,
    });
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<WellsFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex w-full gap-6"
      >
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
