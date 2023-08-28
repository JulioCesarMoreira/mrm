import FormWrapper from '@components/FormWrapper/FormWrapper';
import { ReactElement, useState } from 'react';
import { Well } from '../types';
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
import useUpdateWell from '../hooks/useUpdateWell';
import Spinner from '@components/ui/spinner';
import Tooltip from '@components/Tooltip/Tooltip';
import { Pencil } from 'lucide-react';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { CLOSE_DIALOG_DURATION } from 'constants';

interface WellsFormProperties {
  defaultValues: Well;
}

export default function WellForm({
  defaultValues,
}: WellsFormProperties): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const setToggleFetchWells = useSetAtom(toggleFetchWells);

  const { updateWell } = useUpdateWell();

  async function onSubmitWell(well: Well): Promise<void> {
    setIsLoading(true);

    try {
      if (defaultValues.id) {
        await updateWell(defaultValues.id, well);
      }
    } finally {
      setOpenDialog(false);
      setToggleFetchWells((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      {defaultValues.id ? (
        <Tooltip position="bottom" text="Editar">
          <DialogTrigger>
            <Button variant="ghost" className="group hover:bg-transparent">
              <Pencil
                size={18}
                color="#797E86"
                className="group-hover:stroke-hidro-blue-300 duration-200"
              />
            </Button>
          </DialogTrigger>
        </Tooltip>
      ) : (
        <DataTableTitle
          title={'Poços'}
          addElementButtonLabel="Adicionar poço"
        />
      )}

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {defaultValues.id ? 'Editar poço' : 'Adicionar poço'}
          </DialogTitle>
          <FormWrapper<Well>
            id="well-form"
            onSubmit={onSubmitWell}
            className="py-4"
            defaultValues={defaultValues}
          >
            {isLoading ? (
              <div className="flex-center h-40 w-full">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="mb-4 grid grid-flow-row grid-cols-12 gap-4">
                  form inputs
                </div>

                <hr className="w-full" />

                <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
                  <Button
                    type="submit"
                    variant={'default'}
                    className="bg-hidro-blue-300 hover:bg-main-blue text-white"
                  >
                    Salvar
                  </Button>
                  <DialogTrigger>
                    <Button
                      variant={'secondary'}
                      className="hover:bg-gray-scale-700 transition-colors duration-200"
                    >
                      Cancelar
                    </Button>
                  </DialogTrigger>
                </div>
              </>
            )}
          </FormWrapper>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
