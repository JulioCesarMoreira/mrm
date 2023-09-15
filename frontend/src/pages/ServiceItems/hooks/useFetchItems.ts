import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import { toggleFetchItems } from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';
import { ItemService } from '../types';

interface FetchItemsResponse {
  data: ItemService[];
  isLoading: boolean;
}

export default function useFetchItems(): FetchItemsResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<ItemService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFetch = useAtomValue(toggleFetchItems);

  const fetchData = async (): Promise<{
    itemServices: ItemService[];
  }> => {
    try {
      const response = await axios.get('http://localhost:3000/itemService');

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  useAsyncEffect(async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);

    setData(data.itemServices);
  }, [toggleFetch]);

  return { data, isLoading };
}
