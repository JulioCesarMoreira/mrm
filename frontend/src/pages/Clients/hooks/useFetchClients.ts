import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { Client } from 'pages/Clients/types';
import useAsyncEffect from 'use-async-effect';
import { toggleFetchClients } from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';

interface FetchClientsResponse {
  data: Client[];
  isLoading: boolean;
  fetch: (filters: ClientFilter) => Promise<void>;
}

interface ClientFilter {
  name?: string;
  contactName?: string;
  contactPhone?: string;
}

export default function useFetchClients(): FetchClientsResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFetch = useAtomValue(toggleFetchClients);

  const fetchData = async (
    filters?: ClientFilter,
  ): Promise<{ clients: Client[] }> => {
    try {
      const response = await axios.get(
        'http://localhost:3000/client',
        filters ? { params: filters } : undefined,
      );

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  const fetchWithFilters = async (filters: ClientFilter): Promise<void> => {
    setIsLoading(true);
    const data = await fetchData(filters);
    setIsLoading(false);

    setData(data.clients);
  };

  useAsyncEffect(async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);

    setData(data.clients);
  }, [toggleFetch]);

  return { data, isLoading, fetch: fetchWithFilters };
}
