import FormWrapper from '@components/FormWrapper/FormWrapper';
import { Input } from '@components/Input';
import useFetchClients from 'pages/Clients/hooks/useFetchClients';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import CategoryList from './components/Category/CategoryList';
import FloatingButtons from './components/FloatingButtons';
import ServiceProvider from './context/ServiceProvider';
import useFetchCategories from 'pages/ServiceItems/hooks/useFetchCategories';
import useFetchItems from 'pages/ServiceItems/hooks/useFetchItems';
import WellForm from 'pages/Wells/components/WellForm/WellForm';

interface ServiceFields {
  clientId: string;
}

function ServicesFormPage(): ReactElement {
  const { proposalId } = useParams<{ proposalId?: string }>();
  const { data: clients, isLoading: isLoadingClients } = useFetchClients();
  const { data: items } = useFetchItems(true);
  const { data: categories } = useFetchCategories();

  // TODO: get when accessed directly from the edit route

  return (
    <>
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

        <WellForm
          defaultValues={{
            cep: '',
            city: {
              id: '',
              name: '',
              uf: '',
            },
            cityId: '',
            client: {
              contactName: '',
              contactPhone: '',
              cpfCnpj: '',
              id: '',
              name: '',
              tenantId: '',
            },
            clientName: '',
            deliveryDate: '',
            distric: '',
            dynamicLevel: 0,
            latitude: '',
            longitude: '',
            mapLink: '',
            number: '',
            proposalId: '',
            proposalServiceId: '',
            sedimentaryDepth: 0,
            sieveDepth: 0,
            staticLevel: 0,
            street: '',
            id: '',
            totalDepth: 0,
            voltage: '',
            zipcode: '',
          }}
          isAdding
        />

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
        <CategoryList direction="LEFT" categories={categories} items={items} />
        <CategoryList direction="RIGHT" categories={categories} items={items} />
      </div>

      <FloatingButtons />
    </>
  );
}

export default function Providers(): ReactElement {
  function onSubmitService(): void {}
  return (
    <ServiceProvider>
      <FormWrapper<ServiceFields>
        id="service-form"
        onSubmit={onSubmitService}
        defaultValues={{ clientId: '' }}
        className="relative max-h-[100vh] overflow-hidden"
      >
        <ServicesFormPage />
      </FormWrapper>
    </ServiceProvider>
  );
}
