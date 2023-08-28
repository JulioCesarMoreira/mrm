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
}

export default function useFetchClients(): FetchClientsResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFetch = useAtomValue(toggleFetchClients);

  const fetchData = async (): Promise<{ clients: Client[] }> => {
    try {
      const response = await axios.get('http://localhost:3000/client');

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  useAsyncEffect(async () => {
    setIsLoading(true);
    const test = await fetchData();
    setIsLoading(false);

    setData(test.clients);
  }, [toggleFetch]);

  return { data, isLoading };
}
