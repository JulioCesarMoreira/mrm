import { Input } from '@components/Input';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import Tooltip from '@components/Tooltip/Tooltip';
import { Button } from '@components/ui/button';
import { Search } from 'lucide-react';
import { ReactElement } from 'react';
import { Client } from 'pages/Clients/types';
import { ServiceFilter } from '../types';

interface ProposalServiceFilter {
  clientId: string;
}

interface FilterProperties {
  clients: Client[] | undefined;
  fetch: (filters: ServiceFilter) => Promise<void>;
}

export default function Filters({
  fetch,
  clients,
}: FilterProperties): ReactElement {
  function onSubmitFilters(data: ProposalServiceFilter): void {
    void fetch({ clientId: data.clientId ? Number(data.clientId) : undefined });
  }

  return (
    <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full border-b p-4 pt-2">
      <FormWrapper<ProposalServiceFilter>
        id="filters-form"
        onSubmit={onSubmitFilters}
        className="flex w-full gap-6"
        defaultValues={{ clientId: '' }}
      >
        <Input.Wrapper className="mb-2 ml-6 w-[240px]">
          <Input.Label label="Nome" />
          <Input.Select
            name="clientId"
            disabled={!clients || clients.length === 0}
            options={
              clients
                ? [
                    { name: 'Todos', value: '' },
                    ...clients.map(({ id, name }) => ({
                      name,
                      value: String(id),
                    })),
                  ]
                : []
            }
          />
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
