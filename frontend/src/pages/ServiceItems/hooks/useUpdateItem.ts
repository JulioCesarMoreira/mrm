import axios from 'axios';
import { ItemService } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface UpdateItem {
  updateItem: (
    itemId: string,
    updatedItem: Omit<ItemService, 'id'>,
  ) => Promise<ItemService>;
}

export default function useUpdateItem(): UpdateItem {
  const { toast } = useToast();
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const updateItem = async (
    itemId: string,
    updatedItem: Omit<ItemService, 'id'>,
  ): Promise<ItemService> => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/itemService/${itemId}`,
        {
          ...updatedItem,
          categoryServiceId: Number.parseInt(updatedItem.categoryServiceId, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
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
