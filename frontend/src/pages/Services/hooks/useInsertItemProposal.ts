import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { ItemProposal } from '../types';

interface InsertItemProposal {
  insertItemProposal: (
    insertedItemProposal: Omit<ItemProposal, 'id'>,
  ) => Promise<ItemProposal>;
}

export default function useInsertItemProposal(): InsertItemProposal {
  const { handleError } = useOnError();

  const insertItemProposal = async (
    insertedItemProposal: Omit<ItemProposal, 'id'>,
  ): Promise<ItemProposal> => {
    try {
      const response = await axios.post(
        'http://localhost:3000/itemProposal',
        insertedItemProposal,
      );

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertItemProposal };
}
