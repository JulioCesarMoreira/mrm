import axios from 'axios';
import useOnError from 'hooks/useOnError';
import { ProposalService } from '../types';

interface InsertProposalService {
  insertProposalService: (
    insertedProposal: Omit<ProposalService, 'id'>,
  ) => Promise<ProposalService>;
}

export default function useInsertProposalService(): InsertProposalService {
  const { handleError } = useOnError();

  const insertProposalService = async (
    insertedProposal: Omit<ProposalService, 'id'>,
  ): Promise<ProposalService> => {
    try {
      const response = await axios.post(
        'http://localhost:3000/proposalService',
        insertedProposal,
      );

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { insertProposalService };
}
