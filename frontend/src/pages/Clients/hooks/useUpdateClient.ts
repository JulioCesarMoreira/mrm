import axios from 'axios';
import { Client } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface UpdateClient {
  updateClient: (
    clientId: string,
    updatedClient: Omit<Omit<Client, 'id'>, 'cpfCnpj'>,
  ) => Promise<Client>;
}

export default function useUpdateClient(): UpdateClient {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const updateClient = async (
    clientId: string,
    updatedClient: Omit<Omit<Client, 'id'>, 'cpfCnpj'>,
  ): Promise<Client> => {
    const { idToken } = useAtomValue(authenticatedUserAtom);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/client/${clientId}`,
        updatedClient,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      toast({
        title: 'Cliente atualizado com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { updateClient };
}
