import FormWrapper from '@components/FormWrapper/FormWrapper';
import { MutableRefObject, ReactElement, useEffect, useState } from 'react';
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
import { Info, Pencil } from 'lucide-react';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { CLOSE_DIALOG_DURATION } from 'constants';
import WellFormFields from './WellFormFields';
import WellFormClientData from './WellFormClientData';
import WellFormAddress from './WellFormAddress';
import { format, isValid, parse } from 'date-fns';
import { removeSpecialCharacters } from '@lib/utils';
import Svg from '@components/Svg/Svg';
import { useFormContext } from 'react-hook-form';
import { ServiceFields } from 'pages/Services/types';
import useAsyncEffect from 'use-async-effect';

interface WellsFormProperties {
  defaultValues: Well;
  isAdding?: boolean;
  openWell?: boolean;
  onChangeOpenWell?: (open: boolean) => void;
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

            <WellFormFields isAdding={isAdding} well={defaultValues} />

            <hr className="w-full" />

            <WellFormAddress isAdding={isAdding} />
          </div>

          <hr className="w-full" />

          <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="hover:bg-gray-scale-700 transition-colors duration-200"
              >
                Cancelar
              </Button>
            </DialogTrigger>
            <Button
              type={isAdding ? 'button' : 'submit'}
              onClick={isAdding ? onAdd : undefined}
              variant="default"
              className="bg-hidro-blue-300 hover:bg-main-blue text-white"
            >
              Salvar
            </Button>
          </div>
        </>
      )}
    </>
  );
}

function WellForm({
  defaultValues,
  isAdding,
  openWell,
  isLoading,
  openDialog,
  onSetOpenDialog,
  onChangeOpenWell,
}: WellsFormProperties & {
  onSetOpenDialog: (value: boolean) => void;
  isLoading: boolean;
  openDialog: boolean;
}): ReactElement {
  const { trigger } = useFormContext<ServiceFields>();

  async function onAdd(): Promise<void> {
    const result = await trigger(['well']);

    if (result) onSetOpenDialog(false);
  }

  useEffect(() => {
    if (onChangeOpenWell) onChangeOpenWell(openDialog);
  }, [openDialog]);

  useAsyncEffect(async () => {
    onSetOpenDialog(!!openWell);
  }, [openWell]);

  return (
    <Dialog open={openDialog} onOpenChange={onSetOpenDialog}>
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
        <DataTableTitle title={'Poços'} helpContent={<div />} />
      )}

      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <span>Poço</span>
                <Tooltip position="right" text="Ajuda">
                  <div ref={undefined}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="group mt-1">
                          <Info
                            size={18}
                            className="stroke-gray-scale-400 group-hover:stroke-dark-blue duration-200"
                          />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="min-w-fit">
                        <DialogHeader>Ajuda de formulário: Poço</DialogHeader>
                        <div className="text-gray-scale-300 flex w-[580px] min-w-[580px] flex-col gap-4 pl-6">
                          <ul className="list-disc space-y-4">
                            <li>
                              Esse é o formulário para cadastrar/editar um um
                              poço.
                            </li>
                            <li>
                              Você deve preenchê-lo com:
                              <ul className="ml-6 list-disc">
                                <li>Voltagem (V110 ou V220).</li>
                                <li>
                                  Profundidades obrigatórias (valores em
                                  metros).
                                </li>
                                <li>
                                  Níveis obrigatórios (estático e dinâmico,
                                  valores em metros).
                                </li>
                                <li>
                                  Data de entrega (precisa ser uma data válida).
                                </li>
                                <li>
                                  Você também pode preencher os campos de
                                  endereço, que são opcionais.
                                </li>
                                <li>
                                  Opcionalmente, há um campo de URL para colocar
                                  um link que direcione ao maps, podendo
                                  visualizar a localização do poço.
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Tooltip>
              </div>
              <span className="text-gray-scale-600 text-xs">
                campos com * são obrigatórios
              </span>
            </div>
          </DialogTitle>
          {isAdding ? (
            <WellFormBody
              defaultValues={defaultValues}
              isLoading={false}
              onAdd={onAdd}
              isAdding
            />
          ) : (
            <WellFormBody isLoading={isLoading} defaultValues={defaultValues} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default function WellFormWrapper({
  defaultValues,
  isAdding,
  openWell,
  onChangeOpenWell,
}: WellsFormProperties) {
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
      const result = await updateWell(defaultValues.id, updatedWell);
      if (result) setOpenDialog(false);
    } finally {
      setToggleFetchWells((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  const onSetOpenDialog = (value: boolean): void => setOpenDialog(value);

  return (
    <FormWrapper<Well>
      id="well-form"
      onSubmit={onSubmitWell}
      className="py-4"
      defaultValues={defaultValues}
    >
      <WellForm
        defaultValues={defaultValues}
        isLoading={isLoading}
        openDialog={openDialog}
        onSetOpenDialog={onSetOpenDialog}
        isAdding={isAdding}
        onChangeOpenWell={onChangeOpenWell}
        openWell={openWell}
      />
    </FormWrapper>
  );
}
