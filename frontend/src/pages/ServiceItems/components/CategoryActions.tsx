import { Row } from '@tanstack/react-table';
import { ReactElement, useState } from 'react';
import DeleteDialog from '@components/ui/delete-dialog';
import { CategoryService } from '../types';
import { toggleFetchCategories } from 'constants/atoms';
import CategoryForm from './CategoryForm/CategoryForm';

interface CategoryActionsProperties {
  row: Row<CategoryService>;
}

export default function CategoryActions({
  row: category,
}: CategoryActionsProperties): ReactElement {
  const [openDialog, setOpenDialog] = useState(false);

  const onChangeOpenDialog = (open: boolean): void => setOpenDialog(open);

  return (
    <div className="ml-auto flex w-fit">
      <CategoryForm
        openDialog={openDialog}
        onChangeOpenDialog={onChangeOpenDialog}
        defaultValues={category.original}
      />

      <DeleteDialog
        deleteMessage={`Você está prestes a excluir a categoria ${category.original.name}.`}
        entity="Categoria"
        id={category.original.id}
        route={`${import.meta.env.VITE_API_URL}/categoryService`}
        toggleFetchEntity={toggleFetchCategories}
      />
    </div>
  );
}
