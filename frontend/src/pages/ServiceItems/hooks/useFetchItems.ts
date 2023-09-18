import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import { toggleFetchItems } from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';
import { ItemFilter, ItemService, Status } from '../types';

interface FetchItemsResponse {
  data: ItemService[];
  isLoading: boolean;
  fetch: (filters: ItemFilter) => Promise<void>;
}

export default function useFetchItems(
  onlyAvailable?: boolean,
): FetchItemsResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<ItemService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleFetch = useAtomValue(toggleFetchItems);

  const fetchData = async (
    filters?: ItemFilter,
  ): Promise<{
    itemServices: ItemService[];
  }> => {
    try {
      const response = await axios.get(
        onlyAvailable
          ? 'http://localhost:3000/proposal/item-service/'
          : 'http://localhost:3000/itemService',
        filters ? { params: filters } : undefined,
      );

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  const fetchWithFilters = async (filters: ItemFilter): Promise<void> => {
    setIsLoading(true);

    const data = await fetchData({
      name: filters.name,
      status: filters.status ? filters.status : undefined,
      categoryServiceId: filters.categoryServiceId
        ? filters.categoryServiceId
        : undefined,
    });
    setIsLoading(false);

    setData(data.itemServices);
  };

  useAsyncEffect(async () => {
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);

    setData(data.itemServices);
  }, [toggleFetch]);

  return { data, isLoading, fetch: fetchWithFilters };
}
