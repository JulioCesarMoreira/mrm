import FormWrapper from '@components/FormWrapper/FormWrapper';
import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CategoryList from './components/ServiceForm/Category/CategoryList';
import ServiceProvider from './context/ServiceProvider';
import useFetchCategories from 'pages/ServiceItems/hooks/useFetchCategories';
import useFetchItems from 'pages/ServiceItems/hooks/useFetchItems';
import WellForm from 'pages/Wells/components/WellForm/WellForm';
import { isWellValid, wellDefaultValues } from './constants';
import useServiceContext from './context/useServiceContext';
import useInsertProposal from './hooks/useInsertProposal';
import { formatMoneyString, removeSpecialCharacters } from '@lib/utils';
import useInsertProposalService from './hooks/useInsertProposalService';
import useInsertItemProposal from './hooks/useInsertItemProposal';
import { SelectedCategory, Service, ServiceFields } from './types';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  authenticatedUserAtom,
  toggleFetchServices,
  toggleFetchWells,
} from 'constants/atoms';
import useInsertWell from 'pages/Wells/hooks/useInsertWell';
import { addDays, format, parse, parseISO } from 'date-fns';
import { InsertWellInput } from 'pages/Wells/types';
import axios from 'axios';
import useFetchWells from 'pages/Wells/hooks/useFetchWells';
import useFetchProposalServices from './hooks/useFetchProposalServices';
import useFetchItemProposal from './hooks/useFetchItemProposal';
import ServiceFormHelper from './components/ServiceForm/ServiceFormHelper';
import SelectClientInput from './components/ServiceForm/SelectClientInput';
import FloatingButtons from './components/ServiceForm/FloatingButtons';
import AdditionalFields from './components/ServiceForm/AdditionalFields';
import { useToast } from '@components/ui/use-toast';

function ServicesFormPage(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const { proposalId } = useParams<{ proposalId?: string }>();
  const { toast } = useToast();

  const routeData = location.state as Service | undefined;

  const { data: wells } = useFetchWells();
  const { data: items } = useFetchItems(true);
  const { data: categories } = useFetchCategories();
  const {
    attachments,
    selectedCategories,
    defaultAttachments,
    setSelectedCategories,
  } = useServiceContext();

  const { data: proposalServices } = useFetchProposalServices(proposalId);

  const proposalServiceId = proposalServices?.[0]?.id
    ? String(proposalServices[0].id)
    : undefined;

  const { data: itemsProposal } = useFetchItemProposal(proposalServiceId);

  const { idToken } = useAtomValue(authenticatedUserAtom);
  const setToggleFetchWells = useSetAtom(toggleFetchWells);
  const setToggleFetchServices = useSetAtom(toggleFetchServices);

  const { insertWell } = useInsertWell();
  const { insertProposal } = useInsertProposal();
  const { insertItemProposal } = useInsertItemProposal();
  const { insertProposalService } = useInsertProposalService();

  const [openWell, setOpenWell] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeOpenWell = (open: boolean) => setOpenWell(open);

  async function onSubmitService(data: ServiceFields): Promise<void> {
    if (!isWellValid(data.well)) {
      setOpenWell(true);
      return;
    }

    setIsLoading(true);

    if (proposalId) {
      const deletePromises = [
        axios.delete(`${import.meta.env.VITE_API_URL}/proposal/${proposalId}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }),
        defaultAttachments.map(({ name, key }) =>
          axios.delete(
            `${
              import.meta.env.VITE_API_URL
            }/proposal/${proposalId}/attachment/${key}${name}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json',
              },
            },
          ),
        ),
      ];

      await Promise.all(deletePromises);
    }

    const insertProposalInput = {
      approved: false,
      clientId: Number(data.clientId),
      discount: data.discount ? Number(formatMoneyString(data.discount)) : 0,
      guaranteePeriod: Number(data.guaranteePeriod),
      installmentsBalance: 1,
      sendDate: '2023-09-18',
      percentageEntry: 1,
      periodValidity: '2023-09-18',
    };

    const result = await insertProposal(insertProposalInput);

    try {
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

      const parsedDate = parse(
        data.well.deliveryDate.length > 16
          ? data.well.deliveryDate
          : removeSpecialCharacters(data.well.deliveryDate),
        data.well.deliveryDate.length > 16
          ? "yyyy-MM-dd'T'HH:mm:ss.SSSX"
          : 'ddMMyyyy',
        new Date(),
      );

      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

      const insertWellInput: InsertWellInput = {
        voltage: data.well.voltage,
        totalDepth: Number(data.well.totalDepth),
        sieveDepth: Number(data.well.sieveDepth),
        staticLevel: Number(data.well.staticLevel),
        dynamicLevel: Number(data.well.dynamicLevel),
        deliveryDate: formattedDate,
        sedimentaryDepth: Number(data.well.sedimentaryDepth),
        street: data.well.street,
        number: data.well.number,
        distric: data.well.distric,
        longitude: data.well.longitude,
        latitude: data.well.latitude,
        mapLink: data.well.mapLink,
        cityId: 1,
        proposalId: Number(result.id),
      };

      const attachmentsPromise = [];

      if (attachments.length > 0 || defaultAttachments.length > 0) {
        function renameFile(originalFile: File | Blob, newName: string): File {
          return new File([originalFile], newName, {
            type: originalFile.type,
          });
        }

        const attachmentsToInsert = [
          ...attachments.map(({ file, key }) => ({
            name: file.name,
            key,
            file,
          })),
          ...defaultAttachments,
        ];

        for (const attachment of attachmentsToInsert) {
          const formData = new FormData();
          formData.append(
            `${attachment.key}${attachment.name}`,
            renameFile(attachment.file, `${attachment.key}${attachment.name}`),
          );

          attachmentsPromise.push(
            axios.post<unknown, boolean>(
              `${import.meta.env.VITE_API_URL}/proposal/${
                result.id
              }/attachment`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                  'Content-Type': 'multipart/form-data',
                },
              },
            ),
          );
        }
      }

      if (attachmentsPromise.length > 0) {
        itemsPromises.push(...attachmentsPromise);
      }

      itemsPromises.push(insertWell(insertWellInput));

      await Promise.all(itemsPromises);

      setToggleFetchServices((previous) => !previous);
      setToggleFetchWells((previous) => !previous);

      setIsLoading(false);

      navigate('/servicos');
    } catch (error) {
      if (!proposalId) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/proposal/${result.id}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
      }

      toast({
        title: proposalId
          ? 'Houve um erro ao editar a Proposta de Serviço.'
          : 'Houve um erro ao criar a Proposta de Serviço.',
        variant: 'destructive',
      });
      navigate('/servicos');
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  const foundWell = wells.find(
    (well) => String(well.proposalId) === String(proposalId),
  );

  const handleWellDefaultValues = foundWell
    ? {
        ...foundWell,
        deliveryDate: format(
          addDays(parseISO(foundWell.deliveryDate), 1),
          'ddMMyyyy',
        ),
      }
    : wellDefaultValues;

  useEffect(() => {
    if (proposalId && !routeData) navigate('/servicos');
  }, [proposalId, routeData]);

  useEffect(() => {
    if (
      proposalId &&
      proposalServices &&
      categories &&
      itemsProposal &&
      items
    ) {
      const proposalSelectedCategories: SelectedCategory[] = [];

      for (const proposalService of proposalServices) {
        if (String(proposalService.proposalId) === String(proposalId)) {
          const foundCategory = categories.find(
            (category) =>
              String(category.id) === String(proposalService.categoryServiceId),
          );

          if (foundCategory) {
            const foundItems = itemsProposal.filter(
              (item) =>
                String(item.proposalServiceId) === String(proposalService.id),
            );

            const selectedCategoryToPush = {
              color: foundCategory.color,
              direction: proposalService.side,
              id: foundCategory.id,
              name: foundCategory.name,
              items: foundItems.map((foundItem) => ({
                quantity: String(foundItem.quantity),
                unitPrice: String(foundItem.unitPrice),
                key: String(foundItem.itemServiceId),
                name: items.find(
                  (item) => String(item.id) === String(foundItem.itemServiceId),
                )?.name as string,
                unity: '1',
              })),
            };

            proposalSelectedCategories.push(selectedCategoryToPush);
          }
        }
      }

      setSelectedCategories(proposalSelectedCategories);
    }
  }, [
    proposalId,
    proposalServiceId,
    proposalServices,
    categories,
    itemsProposal,
    items,
  ]);

  return (
    <FormWrapper<ServiceFields>
      id="service-form"
      onSubmit={onSubmitService}
      defaultValues={{
        clientId: routeData?.clientId ? String(routeData.clientId) : '',
        well: handleWellDefaultValues,
        discount: routeData?.discount ? String(routeData.discount) : '',
        guaranteePeriod: routeData?.guaranteePeriod
          ? String(routeData.guaranteePeriod)
          : '',
      }}
      className="relative max-h-[100vh] overflow-hidden"
    >
      <div className="border-gray-scale-800 flex !h-[100px] !min-h-[100px] w-full items-center gap-4 border-b p-4 pt-2">
        <SelectClientInput isLoading={isLoading} />

        <WellForm
          defaultValues={handleWellDefaultValues}
          isAdding
          onChangeOpenWell={onChangeOpenWell}
          openWell={openWell}
        />

        <ServiceFormHelper />

        {/* <Button
          type="button"
          variant={'default'}
          className="bg-hidro-blue-300 hover:bg-main-blue mt-3.5 flex w-40 items-center justify-start gap-7 text-white"
        >
          <Radar size={18} color="white" />
          Detecção
        </Button> */}
      </div>

      <AdditionalFields isLoading={isLoading} />
      <div className="flex h-full w-full divide-x-[1px] border-t">
        <CategoryList direction="LEFT" categories={categories} items={items} />
        <CategoryList direction="RIGHT" categories={categories} items={items} />
      </div>
      <FloatingButtons isLoading={isLoading} />
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
