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
  enabled: boolean,
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
    if (enabled) {
      setIsLoading(true);
      const data = await fetchData();

      setIsLoading(false);

      setData(data.proposalServices);
    }
  }, [toggleFetch, enabled]);

  return { data, isLoading };
}
