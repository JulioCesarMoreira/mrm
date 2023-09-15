import axios from 'axios';
import { ItemService } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

interface InsertItem {
  insertItem: (insertedItem: Omit<ItemService, 'id'>) => Promise<ItemService>;
}

export default function useInsertItem(): InsertItem {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const insertItem = async (
    insertedItem: Omit<ItemService, 'id'>,
  ): Promise<ItemService> => {
    try {
      const response = await axios.post('http://localhost:3000/itemService', {
        ...insertedItem,
        categoryServiceId: Number.parseInt(insertedItem.categoryServiceId, 10),
      });

      toast({
        title: 'Item inserido com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertItem };
}
