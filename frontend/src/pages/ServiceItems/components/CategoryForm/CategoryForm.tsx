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
import { toggleFetchCategories } from 'constants/atoms';
import Spinner from '@components/ui/spinner';
import Tooltip from '@components/Tooltip/Tooltip';
import { Pencil } from 'lucide-react';
import { CLOSE_DIALOG_DURATION } from 'constants';
import CategoryFormFields from './CategoryFormFields';
import { CategoryFields } from 'pages/ServiceItems/types';

interface CategoryFormProperties {
  defaultValues: CategoryFields;
}

export default function CategoryForm({
  defaultValues,
}: CategoryFormProperties): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const setToggleFetchCategories = useSetAtom(toggleFetchCategories);

  async function onSubmitCategory(input: CategoryFields): Promise<void> {
    setIsLoading(true);
    console.log('input', input);

    try {
      if (defaultValues.id) {
        let result;
        // const result = await updateClient(defaultValues.id, {
        //   name: input.name,
        //   contactPhone: input.contactPhone,
        //   contactName: input.contactName,
        // });
        if (result) setOpenDialog(false);
      } else {
        let result;
        // const result = await insertClient(input);
        if (result) setOpenDialog(false);
      }
    } finally {
      setToggleFetchCategories((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {defaultValues.id ? 'Editar categoria' : 'Adicionar categoria'}
          </DialogTitle>
          <FormWrapper<CategoryFields>
            id="category-form"
            onSubmit={onSubmitCategory}
            className="py-4"
            defaultValues={defaultValues}
          >
            {isLoading ? (
              <div className="flex-center h-40 w-full">
                <Spinner />
              </div>
            ) : (
              <>
                <CategoryFormFields />

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
