import FormWrapper from '@components/FormWrapper/FormWrapper';
import { Input } from '@components/Input';
import Svg from '@components/Svg/Svg';
import { Button } from '@components/ui/button';
import { Radar } from 'lucide-react';
import useFetchClients from 'pages/Clients/hooks/useFetchClients';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import CategoryList from './components/CategoryList';

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
      className="max-h-[100vh] overflow-hidden"
    >
      <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full items-center gap-4 border-b p-4 pt-2">
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
        <Button
          type="button"
          variant={'default'}
          className="bg-hidro-blue-300 hover:bg-main-blue mt-3.5 flex w-40 items-center justify-start gap-7 text-white"
        >
          <Svg name="well" className="fill-white" />
          Poço
        </Button>
        {/* <Button
          type="button"
          variant={'default'}
          className="bg-hidro-blue-300 hover:bg-main-blue mt-3.5 flex w-40 items-center justify-start gap-7 text-white"
        >
          <Radar size={18} color="white" />
          Detecção
        </Button> */}
      </div>

      <div className="flex h-full w-full divide-x-[1px]">
        <CategoryList direction="LEFT" />
        <CategoryList direction="RIGHT" />
      </div>
    </FormWrapper>
  );
}
