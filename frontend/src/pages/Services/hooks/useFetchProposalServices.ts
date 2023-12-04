import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import {
  authenticatedUserAtom,
  toggleFetchServices,
} from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';
import { Direction } from '../types';

interface ProposalService {
  id: number;
  order: number;
  side: Direction;
  categoryServiceId: number;
  proposalId: number;
}

interface FetchProposalServicesResponse {
  data: ProposalService[];
  isLoading: boolean;
}

export default function useFetchProposalServices(
  proposalId: string | undefined,
): FetchProposalServicesResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<ProposalService[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFetch = useAtomValue(toggleFetchServices);
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const fetchData = async (): Promise<{
    proposalServices: ProposalService[];
  }> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/proposalService`,
        {
          params: {
            proposalId,
          },
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

  useAsyncEffect(async () => {
    if (proposalId) {
      setIsLoading(true);
      const data = await fetchData();

      setIsLoading(false);

      if (data.proposalServices) setData(data.proposalServices);
    }
  }, [toggleFetch, proposalId]);

  return { data, isLoading };
}
