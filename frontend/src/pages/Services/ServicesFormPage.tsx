import FormWrapper from '@components/FormWrapper/FormWrapper';
import { Input } from '@components/Input';
import useFetchClients from 'pages/Clients/hooks/useFetchClients';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

interface ServiceFields {
  clientId: string;
}

export default function ServicesFormPage(): ReactElement {
  const { proposalId } = useParams<{ proposalId?: string }>();
  const { data: clients, isLoading: isLoadingClients } = useFetchClients();

  function onSubmitService(): void {}

  return (
    <FormWrapper<ServiceFields>
      id="service-form"
      onSubmit={onSubmitService}
      defaultValues={{ clientId: '' }}
    >
      <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full items-center border-b p-4 pt-2">
        <Input.Wrapper className="w-[300px]">
          <Input.Label label="Cliente" required />
          <Input.Search
            name="clientId"
            placeholder="Procure pelo nome"
            loading={isLoadingClients}
            disabled={!isLoadingClients && clients.length === 0}
            options={
              clients
                ? clients.map(({ id, name }) => ({
                    name,
                    value: String(id),
                  }))
                : []
            }
            required
          />
        </Input.Wrapper>
      </div>
    </FormWrapper>
  );
}
