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
import useInsertCategory from 'pages/ServiceItems/hooks/useInsertCategory';
import useUpdateCategory from 'pages/ServiceItems/hooks/useUpdateCategory';

interface CategoryFormProperties {
  defaultValues: CategoryFields;
  openDialog: boolean;
  onChangeOpenDialog: (open: boolean) => void;
}

export default function CategoryForm({
  defaultValues,
  onChangeOpenDialog,
  openDialog,
}: CategoryFormProperties): ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  const setToggleFetchCategories = useSetAtom(toggleFetchCategories);

  const { insertCategory } = useInsertCategory();
  const { updateCategory } = useUpdateCategory();

  async function onSubmitCategory(input: CategoryFields): Promise<void> {
    setIsLoading(true);

    try {
      if (defaultValues.id) {
        const result = await updateCategory(defaultValues.id, {
          name: input.name,
          color: input.color,
          subCategory: input.subCategory,
        });
        if (result) onChangeOpenDialog(false);
      } else {
        const result = await insertCategory(input);
        if (result) onChangeOpenDialog(false);
      }
    } finally {
      setToggleFetchCategories((previous) => !previous);
      setTimeout(() => setIsLoading(false), CLOSE_DIALOG_DURATION);
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={onChangeOpenDialog}>
      {defaultValues.id && (
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
      )}

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
                <CategoryFormFields
                  defaultColor={
                    !!defaultValues.color ? defaultValues.color : undefined
                  }
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
