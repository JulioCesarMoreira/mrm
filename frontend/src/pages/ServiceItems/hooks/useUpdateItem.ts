import axios from 'axios';
import { ItemService } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

interface UpdateItem {
  updateItem: (
    itemId: string,
    updatedItem: Omit<ItemService, 'id'>,
  ) => Promise<ItemService>;
}

export default function useUpdateItem(): UpdateItem {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const updateItem = async (
    itemId: string,
    updatedItem: Omit<ItemService, 'id'>,
  ): Promise<ItemService> => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/itemService/${itemId}`,
        {
          ...updatedItem,
          categoryServiceId: Number.parseInt(updatedItem.categoryServiceId, 10),
        },
      );

      toast({
        title: 'Item atualizado com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { updateItem };
}
