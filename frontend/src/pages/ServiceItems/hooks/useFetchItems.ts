import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import {
  authenticatedUserAtom,
  toggleFetchItems,
} from '../../../constants/atoms';
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
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const fetchData = async (
    filters?: ItemFilter,
  ): Promise<{
    itemServices: ItemService[];
  }> => {
    try {
      const response = await axios.get(
        onlyAvailable
          ? `${import.meta.env.VITE_API_URL}/proposal/item-service/`
          : `${import.meta.env.VITE_API_URL}/itemService`,
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
