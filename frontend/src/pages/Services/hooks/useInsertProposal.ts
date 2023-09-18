import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { Service } from '../types';

interface InsertProposal {
  insertProposal: (insertedProposal: Omit<Service, 'id'>) => Promise<Service>;
}

export default function useInsertProposal(): InsertProposal {
  const { handleError } = useOnError();

  const insertProposal = async (
    insertedProposal: Omit<Service, 'id'>,
  ): Promise<Service> => {
    try {
      const response = await axios.post('http://localhost:3000/proposal', {
        ...insertedProposal,
        tenantId: '3d222283-d485-4b54-acb8-5f290c105143',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertProposal };
}
