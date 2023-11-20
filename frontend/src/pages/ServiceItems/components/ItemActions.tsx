import { Row } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { CategoryService, ItemService } from '../types';
import { toggleFetchItems } from 'constants/atoms';
import DeleteDialog from '@components/ui/delete-dialog';
import ItemForm from './ItemForm/ItemForm';

interface ItemActionsProperties {
  row: Row<ItemService>;
  categories: CategoryService[];
}

export default function ItemActions({
  row: item,
  categories,
}: ItemActionsProperties): ReactElement {
  return (
    <div className="flex-center">
      <ItemForm defaultValues={item.original} categories={categories} />

      <DeleteDialog
        deleteMessage={`Você está prestes a excluir o item ${item.original.name}.`}
        entity="Item"
        id={item.original.id}
        route={`${import.meta.env.VITE_API_URL}/itemService`}
        toggleFetchEntity={toggleFetchItems}
      />
    </div>
  );
}
