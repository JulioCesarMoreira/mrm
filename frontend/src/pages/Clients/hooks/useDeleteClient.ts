import { useToast } from '@components/ui/use-toast';
import axios from 'axios';
import useOnError from 'hooks/useOnError';

interface DeleteClient {
  deleteClient: (clientId: string) => Promise<{
    success: boolean;
  }>;
}

export default function useDeleteClient(): DeleteClient {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const deleteClient = async (
    clientId: string,
  ): Promise<{ success: boolean }> => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/client/${clientId}`,
      );

      toast({
        title: 'Cliente deletado com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { deleteClient };
}
