import FormWrapper from '@components/FormWrapper/FormWrapper';
import { ReactElement, useState } from 'react';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { useSetAtom } from 'jotai';
import { toggleFetchItems } from 'constants/atoms';
import Spinner from '@components/ui/spinner';
import Tooltip from '@components/Tooltip/Tooltip';
import { Pencil } from 'lucide-react';
import DataTableTitle from '@components/DataTable/DataTableTitle';
import { CLOSE_DIALOG_DURATION } from 'constants';
import { CategoryService, ItemServiceFields } from 'pages/ServiceItems/types';
import ItemFormFields from './ItemFormFields';
import useInsertItem from 'pages/ServiceItems/hooks/useInsertItem';
import useUpdateItem from 'pages/ServiceItems/hooks/useUpdateItem';

interface ItemFormProperties {
  defaultValues: ItemServiceFields;
  categories: CategoryService[];
}

export default function ItemForm({
  defaultValues,
  categories,
}: ItemFormProperties): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const setToggleFetchItems = useSetAtom(toggleFetchItems);

  const { insertItem } = useInsertItem();
  const { updateItem } = useUpdateItem();

  async function onSubmitItem(input: ItemServiceFields): Promise<void> {
    setIsLoading(true);

    try {
      if (defaultValues.id) {
        const result = await updateItem(defaultValues.id, {
          name: input.name,
          categoryServiceId: input.categoryServiceId,
          description: input.description,
          status: input.status,
          unit: input.unit,
        });
        if (result) setOpenDialog(false);
      } else {
        const result = await insertItem(input);
        if (result) setOpenDialog(false);
      }
    } finally {
      setToggleFetchItems((previous) => !previous);
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
      ) : (
        <DataTableTitle
          addElementButtonLabel="Adicionar item de serviço"
          disabledAdd={categories.length === 0}
          disabledMessage="Você precisa ter pelo menos uma categoria para poder adicionar itens."
        />
      )}

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {defaultValues.id ? 'Editar item' : 'Adicionar item'}
          </DialogTitle>
          <FormWrapper<ItemServiceFields>
            id="item-form"
            onSubmit={onSubmitItem}
            className="py-4"
            defaultValues={defaultValues}
          >
            {isLoading ? (
              <div className="flex-center h-40 w-full">
                <Spinner />
              </div>
            ) : (
              <>
                <ItemFormFields
                  defaultValues={defaultValues}
                  categories={categories}
                />

                <hr className="w-full" />

                <div className="-mb-4 flex w-full flex-row-reverse gap-4 pt-4">
                  <Button
                    type="submit"
                    variant={'default'}
                    className="bg-hidro-blue-300 hover:bg-main-blue text-white"
                  >
                    Salvar
                  </Button>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
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
