import axios from 'axios';
import { CategoryService } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

interface InsertCategory {
  insertCategory: (
    insertedCategory: Omit<CategoryService, 'id'>,
  ) => Promise<CategoryService>;
}

export default function useInsertCategory(): InsertCategory {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const insertCategory = async (
    insertedCategory: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService> => {
    try {
      const response = await axios.post(
        'http://localhost:3000/categoryService',
        {
          ...insertedCategory,
          tenantId: 'e89e1c41-3d2b-44a8-b43a-ec14433892d5',
        },
      );

      toast({
        title: 'Categoria inserida com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertCategory };
}
