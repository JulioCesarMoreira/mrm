import FormWrapper from '@components/FormWrapper/FormWrapper';
import { ReactElement, useState } from 'react';
import { Well } from '../../types';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { useSetAtom } from 'jotai';
import { toggleFetchWells } from 'constants/atoms';
import useUpdateWell from '../../hooks/useUpdateWell';
import Spinner from '@components/ui/spinner';
import Tooltip from '@components/Tooltip/Tooltip';
import { Pencil } from 'lucide-react';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { CLOSE_DIALOG_DURATION } from 'constants';
import WellFormFields from './WellFormFields';
import WellFormClientData from './WellFormClientData';
import WellFormAddress from './WellFormAddress';
import { format, isValid, parse } from 'date-fns';
import { removeSpecialCharacters } from '@lib/utils';
import Svg from '@components/Svg/Svg';

interface WellsFormProperties {
  defaultValues: Well;
  isAdding?: boolean;
}

function WellFormBody({
  defaultValues,
  isLoading,
  isAdding,
  onAdd,
}: WellsFormProperties & {
  isLoading: boolean;
  onAdd?: () => void;
}): ReactElement {
  return (
    <>
      {isLoading ? (
        <div className="flex-center h-40 w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <hr className="w-full" />

            {!isAdding && (
              <>
                <WellFormClientData well={defaultValues} />
                <hr className="w-full" />
              </>
            )}

            <WellFormFields well={defaultValues} />

            <hr className="w-full" />

            <WellFormAddress />
          </div>

          <hr className="w-full" />

          <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
            <Button
              type={isAdding ? 'button' : 'submit'}
              onClick={isAdding ? onAdd : undefined}
              variant="default"
              className="bg-hidro-blue-300 hover:bg-main-blue text-white"
            >
              Salvar
            </Button>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="hover:bg-gray-scale-700 transition-colors duration-200"
              >
                Cancelar
              </Button>
            </DialogTrigger>
          </div>
        </>
      )}
    </>
  );
}

export default function WellForm({
  defaultValues,
  isAdding,
}: WellsFormProperties): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const setToggleFetchWells = useSetAtom(toggleFetchWells);

  const { updateWell } = useUpdateWell();

  function onAdd(): void {
    setOpenDialog(false);
  }

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
    };

    try {
      const result = await updateWell(defaultValues.id, updatedWell);
      if (result) setOpenDialog(false);
    } finally {
      setToggleFetchWells((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {defaultValues.id ? (
        <Tooltip position="bottom" text="Editar">
          <DialogTrigger asChild ref={undefined}>
            <Button
              ref={undefined}
              variant="ghost"
              className="group hover:bg-transparent"
            >
              <Pencil
                size={18}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            </Button>
          </DialogTrigger>
        </Tooltip>
      ) : isAdding ? (
        <DialogTrigger asChild ref={undefined}>
          <Button
            type="button"
            ref={undefined}
            variant={'default'}
            className="bg-hidro-blue-300 hover:bg-main-blue mt-3.5 flex w-32 items-center justify-start gap-5 text-white"
          >
            <Svg name="well" className="fill-white" />
            Poço
          </Button>
        </DialogTrigger>
      ) : (
        <DataTableTitle title={'Poços'} />
      )}

      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Poço</DialogTitle>
          {isAdding ? (
            <WellFormBody
              defaultValues={defaultValues}
              isLoading={false}
              onAdd={onAdd}
              isAdding
            />
          ) : (
            <FormWrapper<Well>
              id="well-form"
              onSubmit={onSubmitWell}
              className="py-4"
              defaultValues={defaultValues}
            >
              <WellFormBody
                isLoading={isLoading}
                defaultValues={defaultValues}
              />
            </FormWrapper>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
