import axios from 'axios';
import { Well, WellFields } from '../types';
import useOnError from 'hooks/useOnError';
import { useToast } from '@components/ui/use-toast';

interface UpdateWell {
  updateWell: (
    wellId: string,
    updatedWell: Omit<WellFields, 'id'>,
  ) => Promise<Well>;
}

export default function useUpdateWell(): UpdateWell {
  const { toast } = useToast();
  const { handleError } = useOnError();

  const updateWell = async (
    wellId: string,
    updatedWell: Omit<WellFields, 'id'>,
  ): Promise<Well> => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/well/${wellId}`,
        updatedWell,
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
