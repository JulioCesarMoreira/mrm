import axios from 'axios';
import { Client } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface InsertClient {
  insertClient: (insertedClient: Omit<Client, 'id'>) => Promise<Client>;
}

export default function useInsertClient(): InsertClient {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const insertClient = async (
    insertedClient: Omit<Client, 'id'>,
  ): Promise<Client> => {
    const { idToken } = useAtomValue(authenticatedUserAtom);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/client`,
        {
          ...insertedClient,
          tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

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
