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
import { wellDefaultValues } from './constants';
import useServiceContext from './context/useServiceContext';
import useInsertProposal from './hooks/useInsertProposal';
import { formatMoneyString } from '@lib/utils';
import useInsertProposalService from './hooks/useInsertProposalService';
import useInsertItemProposal from './hooks/useInsertItemProposal';
import { ServiceFields } from './types';

function ServicesFormPage(): ReactElement {
  const { proposalId } = useParams<{ proposalId?: string }>();
  const { data: clients, isLoading: isLoadingClients } = useFetchClients();
  const { data: items } = useFetchItems(true);
  const { data: categories } = useFetchCategories();
  const { selectedCategories } = useServiceContext();

  // TODO: get when accessed directly from the edit route

  const { insertProposal } = useInsertProposal();
  const { insertProposalService } = useInsertProposalService();
  const { insertItemProposal } = useInsertItemProposal();

  async function onSubmitService(data: ServiceFields): Promise<void> {
    if (proposalId) {
      console.log('editando');
      return;
    }

    const insertProposalInput = {
      approved: false,
      clientId: Number(data.clientId),
      discount: Number(formatMoneyString(data.discount)),
      guaranteePeriod: Number(data.guaranteePeriod),
      installmentsBalance: 1,
      sendDate: '2023-09-18',
      percentageEntry: 1,
      periodValidity: '2023-09-18',
    };

    const result = await insertProposal(insertProposalInput);
    const categoriesPromises = [];

    for (const [index, category] of selectedCategories.entries()) {
      if (category.items.length > 0) {
        categoriesPromises.push(
          insertProposalService({
            categoryServiceId: Number(category.id),
            order: index,
            proposalId: Number(result.id),
            side: category.direction,
          }),
        );
      }
    }

    const categoriesResults = await Promise.all(categoriesPromises);

    const itemsPromises = [];

    for (const category of categoriesResults) {
      const insertedCategoryItems = selectedCategories.find(
        (selectedCategory) =>
          Number(selectedCategory.id) === category.categoryServiceId,
      )?.items;

      if (insertedCategoryItems) {
        for (const item of insertedCategoryItems) {
          itemsPromises.push(
            insertItemProposal({
              itemServiceId: Number(item.key),
              proposalServiceId: category.id,
              quantity: Number(item.quantity),
              unitPrice: 1,
            }),
          );
        }
      }
    }

    await Promise.all(itemsPromises);
  }

  return (
    <FormWrapper<ServiceFields>
      id="service-form"
      onSubmit={onSubmitService}
      defaultValues={{
        clientId: '',
        well: wellDefaultValues,
        discount: '',
        guaranteePeriod: '',
      }}
      className="relative max-h-[100vh] overflow-hidden"
    >
      <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full items-center gap-4 border-b p-4 pt-2">
        <Input.Wrapper className="ml-1 w-[300px]">
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

        <WellForm defaultValues={wellDefaultValues} isAdding />

        {/* <Button
          type="button"
          variant={'default'}
          className="bg-hidro-blue-300 hover:bg-main-blue mt-3.5 flex w-40 items-center justify-start gap-7 text-white"
        >
          <Radar size={18} color="white" />
          Detecção
        </Button> */}
      </div>

      <div className="flex h-[74px] items-center justify-start gap-4 pl-5 pb-4">
        <Input.Wrapper className="w-[140px]">
          <Input.Label label="Desconto" required />
          <Input.Field
            name="discount"
            maskType="money"
            required
            className="pl-6"
          >
            <div className="text-gray-scale-200 absolute left-2 text-sm">
              R$
            </div>
          </Input.Field>
        </Input.Wrapper>

        <Input.Wrapper className="w-[140px]">
          <Input.Label label="Garantia (meses)" required />
          <Input.Field
            name="guaranteePeriod"
            maskType="numberWithoutDecimals"
            placeholder="meses"
            required
          />
        </Input.Wrapper>
      </div>
      <div className="flex h-full w-full divide-x-[1px] border-t">
        <CategoryList direction="LEFT" categories={categories} items={items} />
        <CategoryList direction="RIGHT" categories={categories} items={items} />
      </div>
      <FloatingButtons />
    </FormWrapper>
  );
}

export default function Providers(): ReactElement {
  return (
    <ServiceProvider>
      <ServicesFormPage />
    </ServiceProvider>
  );
}
