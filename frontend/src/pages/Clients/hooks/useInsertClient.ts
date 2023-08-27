import axios from 'axios';
import { Client } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

interface InsertClient {
  insertClient: (insertedClient: Omit<Client, 'id'>) => Promise<Client>;
}

export default function useInsertClient(): InsertClient {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const insertClient = async (
    insertedClient: Omit<Client, 'id'>,
  ): Promise<Client> => {
    try {
      const response = await axios.post('http://localhost:3000/client', {
        ...insertedClient,
        tenantId: '321a4adc-bf83-4d62-b4ae-1e8fac2e53cf',
      });

      toast({
        title: 'Cliente inserido com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertClient };
}
