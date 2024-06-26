import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import {
  authenticatedUserAtom,
  toggleFetchServices,
} from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';

interface ItemProposal {
  id: number;
  unitPrice: number;
  quantity: number;
  proposalServiceId: number;
  itemServiceId: number;
}

interface FetchItemProposalResponse {
  data: ItemProposal[];
  isLoading: boolean;
}

export default function useFetchItemProposal(
  proposalServiceId: string | undefined,
): FetchItemProposalResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<ItemProposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFetch = useAtomValue(toggleFetchServices);
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const fetchData = async (
    id: string,
  ): Promise<{
    itemProposals: ItemProposal[];
  }> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/itemProposal`,
        {
          params: {
            proposalServiceId: id,
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
    if (proposalServiceId) {
      setIsLoading(true);
      const data = await fetchData(proposalServiceId);

      setIsLoading(false);

      if (data.itemProposals) setData(data.itemProposals);
    }
  }, [toggleFetch, proposalServiceId]);

  return { data, isLoading };
}
