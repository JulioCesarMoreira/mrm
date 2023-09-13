import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

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

  const deleteEntity = async (id: string): Promise<{ success: boolean }> => {
    try {
      const response = await axios.delete(`${route}/${id}`);

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
