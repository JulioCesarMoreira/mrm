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
          tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
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
