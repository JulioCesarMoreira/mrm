import { Input } from '@components/Input';
import useFetchClients from 'pages/Clients/hooks/useFetchClients';
import { ReactElement } from 'react';

export default function SelectClientInput({
  isLoading,
}: {
  isLoading: boolean;
}): ReactElement {
  const { data: clients, isLoading: isLoadingClients } = useFetchClients();

  return (
    <Input.Wrapper className="ml-1 w-[300px]">
      <Input.Label label="Cliente" required />
      <Input.Search
        name="clientId"
        placeholder="Procure pelo nome"
        loading={isLoadingClients}
        disabled={(!isLoadingClients && clients.length === 0) || isLoading}
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
  );
}
