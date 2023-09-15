import axios from 'axios';
import { CategoryService } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

interface UpdateCategory {
  updateCategory: (
    categoryId: string,
    updatedCategory: Omit<CategoryService, 'id'>,
  ) => Promise<CategoryService>;
}

export default function useUpdateCategory(): UpdateCategory {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const updateCategory = async (
    categoryId: string,
    updatedCategory: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService> => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/categoryService/${categoryId}`,
        updatedCategory,
      );

      toast({
        title: 'Categoria atualizada com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { updateCategory };
}
