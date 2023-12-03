import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import {
  authenticatedUserAtom,
  toggleFetchServices,
} from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';
import { ServiceFilter, Service } from '../types';

interface FetchServicesResponse {
  data: Service[];
  isLoading: boolean;
  fetch: (filters: ServiceFilter) => Promise<void>;
}

export default function useFetchServices(): FetchServicesResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFetch = useAtomValue(toggleFetchServices);
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const fetchData = async (
    filters?: ServiceFilter,
  ): Promise<{ proposals: Service[] }> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/proposal`,
        filters
          ? {
              params: filters,
              headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json',
              },
            }
          : {
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

  const fetchWithFilters = async (filters: ServiceFilter): Promise<void> => {
    setIsLoading(true);
    const data = await fetchData(filters);
    setIsLoading(false);

    setData(data.proposals);
  };

  useAsyncEffect(async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);

    if (data.proposals) setData(data.proposals);
  }, [toggleFetch]);

  return { data, isLoading, fetch: fetchWithFilters };
}
