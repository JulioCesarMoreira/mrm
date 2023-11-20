import axios from 'axios';
import { CategoryService } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface UpdateCategory {
  updateCategory: (
    categoryId: string,
    updatedCategory: Omit<CategoryService, 'id'>,
  ) => Promise<CategoryService>;
}

export default function useUpdateCategory(): UpdateCategory {
  const { toast } = useToast();
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const updateCategory = async (
    categoryId: string,
    updatedCategory: Omit<CategoryService, 'id'>,
  ): Promise<CategoryService> => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/categoryService/${categoryId}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        },
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
