import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { ProposalService } from '../types';
import { authenticatedUserAtom } from 'constants/atoms';
import { useAtomValue } from 'jotai';

interface InsertProposalService {
  insertProposalService: (
    insertedProposal: Omit<ProposalService, 'id'>,
  ) => Promise<ProposalService>;
}

export default function useInsertProposalService(): InsertProposalService {
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const insertProposalService = async (
    insertedProposal: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/proposalService`,
        insertedProposal,
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

  return { insertProposalService };
}
