import { Row } from '@tanstack/react-table';
import { ReactElement, useState } from 'react';
import { Well } from '../../types';
import WellForm from './WellForm';
import DeleteDialog from '@components/ui/delete-dialog';
import { toggleFetchWells } from 'constants/atoms';
import { addDays, format, isValid, parse, parseISO } from 'date-fns';
import FormWrapper from '@components/FormWrapper/FormWrapper';
import useUpdateWell from 'pages/Wells/hooks/useUpdateWell';
import { removeSpecialCharacters } from '@lib/utils';
import { useSetAtom } from 'jotai';
import { CLOSE_DIALOG_DURATION } from 'constants/index';

interface WellActionsProperties {
  row: Row<Well>;
}

export default function WellActions({
  row: well,
}: WellActionsProperties): ReactElement {
  const { updateWell } = useUpdateWell();
  const setToggleFetchWells = useSetAtom(toggleFetchWells);

  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  async function onSubmitWell(well: Well): Promise<void> {
    setIsLoading(true);

    const parsedDate = parse(
      removeSpecialCharacters(well.deliveryDate),
      'ddMMyyyy',
      new Date(),
    );

    const formattedDate = isValid(parsedDate)
      ? format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      : undefined;

    const updatedWell = {
      voltage: well.voltage,
      totalDepth: well.totalDepth ? Number(well.totalDepth) : undefined,
      sieveDepth: well.sieveDepth ? Number(well.sieveDepth) : undefined,
      staticLevel: well.staticLevel ? Number(well.staticLevel) : undefined,
      dynamicLevel: well.dynamicLevel ? Number(well.dynamicLevel) : undefined,
      deliveryDate: isValid(parsedDate) ? formattedDate : undefined,
      sedimentaryDepth: well.sedimentaryDepth
        ? Number(well.sedimentaryDepth)
        : undefined,
      street: well.street,
      number: well.number,
      distric: well.distric,
      zipcode: well.zipcode ? removeSpecialCharacters(well.zipcode) : undefined,
      longitude: well.longitude,
      latitude: well.latitude,
      mapLink: well.mapLink,
    };

    try {
      if (updateWell) {
        const result = await updateWell(well.id, updatedWell);
        if (result) setOpenDialog(false);
      }
    } finally {
      setToggleFetchWells((previous) => !previous);
    }
    setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
  }

  const onChangeOpenWell = (value: boolean): void => setOpenDialog(value);

  return (
    <div className="flex-center">
      <FormWrapper<Well>
        id="well-form"
        onSubmit={onSubmitWell}
        className="py-1"
        defaultValues={well.original}
      >
        <WellForm
          defaultValues={{
            ...well.original,
            deliveryDate: format(
              addDays(parseISO(well.original.deliveryDate), 1),
              'ddMMyyyy',
            ),
          }}
          isLoading={isLoading}
          onChangeOpenWell={onChangeOpenWell}
          openWell={openDialog}
        />
      </FormWrapper>
      <DeleteDialog
        deleteMessage="Você está prestes a excluir esse poço."
        entity="Poço"
        id={well.original.id}
        route={`${import.meta.env.VITE_API_URL}/well`}
        toggleFetchEntity={toggleFetchWells}
      />
    </div>
  );
}
