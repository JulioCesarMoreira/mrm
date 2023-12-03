import axios from 'axios';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import useAsyncEffect from 'use-async-effect';
import {
  authenticatedUserAtom,
  toggleFetchCategories,
} from '../../../constants/atoms';
import useOnError from 'hooks/useOnError';
import { CategoryService } from '../types';

interface FetchCategoriesResponse {
  data: CategoryService[];
  isLoading: boolean;
}

export default function useFetchCategories(): FetchCategoriesResponse {
  const { handleError } = useOnError();

  const [data, setData] = useState<CategoryService[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFetch = useAtomValue(toggleFetchCategories);
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const fetchData = async (): Promise<{
    categoryServices: CategoryService[];
  }> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/categoryService`,
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
    setIsLoading(true);
    const data = await fetchData();
    setIsLoading(false);

    if (data.categoryServices) setData(data.categoryServices);
  }, [toggleFetch]);

  return { data, isLoading };
}
