import axios from 'axios';
import { Well, WellFields } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';
import { useAtomValue } from 'jotai';
import { authenticatedUserAtom } from 'constants/atoms';

interface UpdateWell {
  updateWell: (
    wellId: string,
    updatedWell: Omit<WellFields, 'id'>,
  ) => Promise<Well>;
}

export default function useUpdateWell(): UpdateWell {
  const { toast } = useToast();
  const { handleError } = useOnError();
  const { idToken } = useAtomValue(authenticatedUserAtom);

  const updateWell = async (
    wellId: string,
    updatedWell: Omit<WellFields, 'id'>,
  ): Promise<Well> => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/well/${wellId}`,
        updatedWell,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      toast({
        title: 'Poço atualizado com sucesso.',
        className: 'dark bg-dark-blue text-white stroke-white',
      });

      return response.data;
    } catch (error) {
      handleError(error);

      throw error;
    }
  };

  return { updateWell };
}
