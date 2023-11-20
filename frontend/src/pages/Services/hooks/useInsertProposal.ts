import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { Service } from '../types';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface InsertProposal {
  insertProposal: (insertedProposal: Omit<Service, 'id'>) => Promise<Service>;
}

export default function useInsertProposal(): InsertProposal {
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const insertProposal = async (
    insertedProposal: Omit<Service, 'id'>,
  ): Promise<Service> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/proposal`,
        {
          ...insertedProposal,
          tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertProposal };
}
