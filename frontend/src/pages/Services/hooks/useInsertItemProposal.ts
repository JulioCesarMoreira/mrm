import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { ItemProposal } from '../types';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface InsertItemProposal {
  insertItemProposal: (
    insertedItemProposal: Omit<ItemProposal, 'id'>,
  ) => Promise<ItemProposal>;
}

export default function useInsertItemProposal(): InsertItemProposal {
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const insertItemProposal = async (
    insertedItemProposal: Omit<ItemProposal, 'id'>,
  ): Promise<ItemProposal> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/itemProposal`,
        insertedItemProposal,
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

  return { insertItemProposal };
}
