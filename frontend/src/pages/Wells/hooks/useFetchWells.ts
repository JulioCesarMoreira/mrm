import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import { toggleFetchWells } from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';
import { Well } from '../types';

interface WellsFilter {
  startDate: string;
  deliveryDate: string;
}

interface FetchWellsResponse {
  data: Well[];
  isLoading: boolean;
  fetch: (filters: WellsFilter) => Promise<void>;
}

export default function useFetchWells(): FetchWellsResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<Well[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFetch = useAtomValue(toggleFetchWells);

  const fetchData = async (
    filters?: WellsFilter,
  ): Promise<{ wells: Well[] }> => {
    try {
      const response = await axios.get(
        'http://localhost:3000/well',
        filters ? { params: filters } : undefined,
      );

      return response.data;
    } catch (error) {
      setIsLoading(false);
      handleError(error);

      throw error;
    }
  };

  const fetchWithFilters = async (filters: WellsFilter): Promise<void> => {
    setIsLoading(true);
    const data = await fetchData(filters);
    setIsLoading(false);

    setData(data.wells);
  };

  useAsyncEffect(async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);

    setData(data.wells);
  }, [toggleFetch]);

  return { data, isLoading, fetch: fetchWithFilters };
}
