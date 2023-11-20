import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface DeleteEntity {
  deleteEntity: (id: string) => Promise<{
    success: boolean;
  }>;
}

export default function useDeleteEntity(
  entity: string,
  route: string,
): DeleteEntity {
  const { toast } = useToast();
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const deleteEntity = async (id: string): Promise<{ success: boolean }> => {
    try {
      const response = await axios.delete(`${route}/${id}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: `${entity} deletado com sucesso.`,
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { deleteEntity };
}
