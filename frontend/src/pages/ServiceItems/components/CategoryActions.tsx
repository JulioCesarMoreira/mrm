import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
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
  return (
    <div className="ml-auto flex w-fit">
      <CategoryForm defaultValues={category.original} />

      <DeleteDialog
        deleteMessage={`Você está prestes a excluir a categoria ${category.original.name}.`}
        entity="Categoria"
        id={category.original.id}
        route="http://localhost:3000/categoryService"
        toggleFetchEntity={toggleFetchCategories}
      />
    </div>
  );
}
